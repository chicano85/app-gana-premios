const uuid = require('uuid');
const db = require('../config/db');
const { UserGroup } = require('../models/index');

// Stablish database connection
db.connect();

const seedUserGroups = [
  {
    uuid: uuid.v4(),
    name: 'Admin',
    permissions: 'ADMIN',
    deleted: false,
  },
  {
    uuid: uuid.v4(),
    name: 'Managers',
    permissions: 'MANAGERS,campaigns:all,clients:view,promotions:all',
    deleted: false,
  },
  {
    uuid: uuid.v4(),
    name: 'Participants',
    permissions: 'PARTICIPANTS',
    deleted: false,
  },
];

const seedDB = async () => {
  await UserGroup.deleteMany({});
  await UserGroup.insertMany(seedUserGroups);
};

// Seed the database and close database connection
seedDB().then(() => {
  db.disconnect();
});
