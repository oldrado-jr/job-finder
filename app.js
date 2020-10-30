const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./model/Job');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
});

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));

// Handle Bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Static folders
app.use(express.static(path.join(__dirname, 'public')));

// DB Connection
(async () => {
    try {
        await db.authenticate();
        console.log('Conectou ao banco com sucesso!');
    } catch (error) {
        console.error(`Ocorreu um erro ao conectar: ${error}`);
    }
})();

// Routes
app.get('/', async (request, response) => {
    const jobs = await Job.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    });
    response.render('index', {jobs});
});

// Jobs routes
app.use('/jobs', require('./routes/jobs'));
