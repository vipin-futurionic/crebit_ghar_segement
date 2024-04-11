const express = require('express');
const router = express.Router();
const Gigs = require('../model/Gigs')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get Gigs
router.get('/', (req, res,) => {
    Gigs.findAll()
        .then(gigs => {

            console.log(gigs);
            res.render('gigs', {
                gigs
            });

        }).catch((error) => {
            console.error('Error:', error);
        });


});

//Diaplay Gig Add Form
router.get('/add', (req, res) => {
    res.render('add');
});

// Add A Gig
router.post('/add', (req, res) => {

    let { title, technologies, budget, description, contact_email } = req.body;
    let errors = [];


    // Validation
    if (!title) {
        errors.push({ text: 'Title is required' });
    }
    if (!technologies) {
        errors.push({ text: 'Technologies is required' });
    }
    if (!description) {
        errors.push({ text: 'Description is required' });
    }
    if (!contact_email) {
        errors.push({ text: 'Contact E-mail is required' });
    }

    if (errors.length > 0) {

        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        });

    }
    else {

        if (!budget) {
            budget = 'Unknown';
        } else {
            budget = `$${budget}`;
        }
        //Make lower and space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ', ');
        // Insert into Table
        Gigs.create({ title, technologies, budget, description, contact_email })
            .then(() => {
                res.redirect('/gigs');
            }).catch((error) => {
                console.error('Error:', error);
            });

    }


});

router.get('/search', (req, res) => {
    let { term } = req.query;
    term = term.toLowerCase().trim();
    if (term) {
        Gigs.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
            .then(gigs => {
                res.render('gigs', {
                    gigs
                });
            });
    }

});

module.exports = router