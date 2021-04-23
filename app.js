var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000, () => console.log('Server is run in http://localhost:3000'));
