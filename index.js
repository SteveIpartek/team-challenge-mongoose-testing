const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const postsRoutes = require('./routes/posts');

app.use(express.json());
app.use('/posts', postsRoutes);

dbConnection();

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));