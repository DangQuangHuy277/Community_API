const { Role } = require('../models');

exports.create = (req, res) => {
  Role.create(req.body).then((role) => res.status(201).send(role));
};

exports.deleteAll = (req, res) => {
  console.log(`my process is ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === 'test') {
    Role.truncate({ cascade: true, restartIdentity: true })
      .then(() => res.status(204).send({}));
  } else {
    res.status(403).send({ message: 'Whoa there' });
  }
};

exports.findAll = async (req, res) => {
  const roles = await Role.findAll({ attributes: ['name', 'description'], order: ['name'] });
  res.status(200).send(roles);
};
