const express = require('express');
const app = express(); // você precisa chamar express como uma função para criar uma instância do aplicativo
const baseDir = `${__dirname}/dist/`;
const port = 4000;

app.use(express.static(baseDir));
app.get('*', (req, res) => res.sendFile('index.html', { root: baseDir }));
app.listen(port, () => console.log(`Servidor subiu com sucesso`));
