const connection = require('../database/connection');

module.exports = {
    
    async index(request, response) {        
        const { page = 1 } = request.query;

        //Usar o [] para pegar apenas a primeira posição do array
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.zap', 'ongs.city', 'ongs.uf']);        
        
        //Enviar o total de registro pelo cabeçalho da resposta
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
    
    async create(request, response) {
        const { title, description, value } = request.body;

        //Acessar cabeçalho quem vem do contexto da app da autenticação do usuário
        //request.headers;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        //Pegar id vindo da url
        const { id } = request.params;

        //Pegar id da ong logada
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        //Verificar se a ong logada é a mesma que criou o incidente
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Não autorizado' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
    
    async incidentsOng (request, response) {
        //Pegar id vindo da url
        const { id } = request.params;
        
        const incidents = await connection('incidents')
            .where('ong_id', id)
            .select('*');

        return response.json (incidents);
    }
}