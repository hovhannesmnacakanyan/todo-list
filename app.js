const express = require('express');
const app = express();

const PORT = process.env.PORT || 6000;

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(PORT, () =>
  console.log(`Server is run in http://localhost:${PORT}`),
);
