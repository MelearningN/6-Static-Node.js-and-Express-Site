const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// static middleware
app.use(express.static('public'))

app.use('/', indexRouter);

// Page not found middleware
app.use((req, res, next) => {
    console.log('404 error handler called');
    res.status(404).render('page-not-found');
});

// Error middleware
app.use((err, req, res, next) => {
    if (err.status === 404) {
        console.log(err.status, err.message)
        res.status(400).render('page-not-found', {err});
    } else {
        err.message = err.message || "Something is seriously wrong"
        console.log(err.status, err.message)
        res.status(err.status || 500).render('error', {err});
    }
});

app.listen(3000);
