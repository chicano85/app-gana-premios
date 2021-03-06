const fs = require('fs');

const privateKey = fs.readFileSync(`${__dirname}/certs/private.key`);
const publicKey = fs.readFileSync(`${__dirname}/certs/public.key`);

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  jwt: {
    private: privateKey,
    public: publicKey,
    expiresIn: process.env.JWT_EXPIRESIN || 3600,
  },
  mongo: {
    init: process.env.DB_INIT || true,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    port: process.env.DB_PORT,
    dir: `../${process.env.DB_MODEL}`,
  },
  pagination: {
    pageSize: 10,
    maxPageSize: 100,
  },
  mediaStorageFolder: '../../media',
  emailsFolder: 'src/views/emails',
};
