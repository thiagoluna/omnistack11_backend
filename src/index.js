const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

//Inserir segurança
app.use(cors());

//Receber parametros do form no formato json
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);