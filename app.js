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
    const err= new Error();
    err.status=404;
    next(err)
  });

// Error middleware
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(400).render('error', { err, message:'404-Page Not Found' });
  } else {
    res.status(err.status || 500).render('error', { err, message:'500-Something is seriously wrong' });
  }
});

app.listen(3000);