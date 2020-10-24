const { request, response } = require('express');
const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
});

app.get('/', (request, response) => {
    response.send('Está funcionando!');
});
