const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const RoleController = require('./server/controllers/roles');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/roles', RoleController.create);

app.get('/roles', RoleController.findAll);

app.delete('/roles', RoleController.deleteAll);

app.get('*', (req, res) => res.status(404).send({
  message: 'Nothing to see here!!!',
}));

module.exports = app;
