const express = require('express');
const app = express();

const PORT = process.env.PORT || 6000;

const indexRoute = require('./routes/home.route');
const authRoute = require('./routes/auth.route');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/auth', authRoute);

app.listen(PORT, () =>
  console.log(`Server is run in http://localhost:${PORT}`),
);
