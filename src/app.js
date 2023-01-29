const express = require('express');
const { loginRouter, userRouter, categoriesRouter } = require('./routes');

const app = express();

app.use(express.json());

app.use('/', loginRouter);

app.use('/', userRouter);

app.use('/', categoriesRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
