const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Server is run in http://localhost:${PORT}`));
