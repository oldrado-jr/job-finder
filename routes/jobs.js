const express = require('express');
const router = express.Router();
const Job = require('../model/Job');

// Form da rota de envio
router.get('/add', (request, response) => {
    response.render('add');
});

// Detalhes da vaga
router.get('/view/:id', async (request, response) => {
    try {
        const job = await Job.findOne({
            where: {id: request.params.id}
        });
        response.render('view', {job});
    } catch (err) {
        console.error(err);
    }
});

// add job via post
router.post('/add', async (request, response) => {
    const {
        title,
        description,
        salary,
        company,
        email,
        new_job,
    } = request.body;

    // insert
    try {
        await Job.create({
            title,
            description,
            salary,
            company,
            email,
            new_job,
        });
        response.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
