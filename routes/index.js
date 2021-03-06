const express = require('express');
const router = express.Router();
const {projects} = require('../data/data.json');
const {myInfo} = require('../data/data.json');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {projects});
});

/* GET about page. */
router.get('/about', function (req, res, next) {
    res.render('about', {myInfo});
});


/* GET projects detail page. */
router.get('/projects/:id', function (req, res, next) {
    const projectId = req.params.id;
    const project = projects.find(({id}) => id === + projectId);

    if (project) {
        res.render('project', {project});
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "No such project exist"
        next(err);
    }
});

module.exports = router;
