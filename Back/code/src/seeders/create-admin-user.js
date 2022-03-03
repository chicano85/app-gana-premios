// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const db = require('../config/db');
const { User, UserGroup } = require('../models/index');

// connection with database
db.connect();

const password = bcrypt.hashSync('Domingo_31', bcrypt.genSaltSync(10));

const seedDB = async () => {
  const adminGroup = await UserGroup.findOne({ name: 'Admin' });
  console.log(adminGroup);
  if (!adminGroup) {
    throw new Error('no se ha encontrado');
  }

  const seedAdminShema = {
    uuid: uuid.v4(),
    name: 'Administrador',
    email: 'admin@admin.com',
    password,
    role_uuid: adminGroup.uuid,
    token: '',
    active: true,
    priority: 2,
    blocked: false,
  };
  await User.deleteMany({});
  await User.insertMany(seedAdminShema);
};

// Seed
seedDB().then(() => {
  db.disconnect();
});
