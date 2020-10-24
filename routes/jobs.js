const express = require('express');
const router = express.Router();
const Job = require('../model/Job');

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
