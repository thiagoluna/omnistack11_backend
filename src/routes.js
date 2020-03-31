const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/** LOGIN */
routes.post('/sessions', SessionController.create);

/** ONGS */
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

/** INCIDENTS */
routes.get('/incidents', IncidentController.index);
routes.get('/incidents-org/:id', IncidentController.incidentsOng);
routes.get('/profile', ProfileController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;


/**
 * Tipos de parâmetros
 * 
 * Query: parâmetros nomeados enviados na rota após o "?" 
 * Route: utilizados para identificar recursos
 * Request body: Corpo da requisição utilizado para criar ou alterar recursos
 */

/* routes.post('/users', (request, response) => {
    const body = request.body;
    console.log(body);
});

routes.get('/ongs', async(request, response) => {
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
});

 routes.get('/users/:1', (request, response) => {
    const params = request.params; 
    console.log(params);
});

 routes.get('/users', (request, response) => {
    const params = request.query;

    console.log(params);

    //return response.send('Hello World!');
    return response.json({
        evento: 'Semana OmniStack 11.00',
        aluno: "Thiago Luna de Melo"
    });
});
*/
