const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 8080;

const { dbConnection } = require('./config/config');

const postsRoutes = require('./routes/posts');
app.use(express.json());

dbConnection();

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));