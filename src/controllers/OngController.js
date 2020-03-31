//arquivo de conexão com o bd
const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response) {
        //pega toos os dados
        //const data = request.body;

        //pega somente os valores discriminados dentro das { }
        const { name, email, zap, city, uf} = request.body;

        //criar id
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id, name, email, zap, city, uf
        })

        //console.log(data);

        return response.json({id});
    }
};