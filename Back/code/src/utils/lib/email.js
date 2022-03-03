/* eslint-disable max-len */
const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { getTranslation } = require('../getTranslation');
const { emailsFolder } = require('../../config/index');

const sendEmail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '1d050c4c6a225e',
      pass: '63704b510f7d4f',
    },
  });
  return transporter.sendMail(mailOptions);
};

// Mail para activar cuenta

const sendActiveAccountEmail = async (email, token, language) => {
  const route = path.join(emailsFolder, '/active.hbs');
  const emailTemplateSource = fs.readFileSync(route, 'utf8');
  const template = Handlebars.compile(emailTemplateSource);
  const title = getTranslation('activeMailTitle', language);
  const message = getTranslation('activeMailMessage', language);
  const buttonText = getTranslation('activeButtonText', language);
  const htmlToSend = template({
    url: `${process.env.FRONT_BASE_URL}/account/${token}/activate`,
    title,
    message,
    buttonText,
  });

  const activeAccountMailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: email, // list of receivers
    subject: getTranslation('activeSubject', language), // Subject line
    html: htmlToSend, // plain html body
  };

  return sendEmail(activeAccountMailOptions);
};

// Mail para desbloquear cuenta

const sendBlockedAccountEmail = async (email, token) => {
  const route = path.join(emailsFolder, '/blocked.hbs');
  console.log('ruta block', route);
  const emailTemplateSource = fs.readFileSync(route, 'utf8');
  const template = Handlebars.compile(emailTemplateSource);
  const htmlToSend = template({ url: `${process.env.FRONT_BASE_URL}/active-account/${token}` });

  const blockedMailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: email, // list of receivers
    subject: 'Desbloquear cuenta', // Subject line
    html: htmlToSend, // plain html body
  };

  return sendEmail(blockedMailOptions);
};

// Mail para recuperar la contraseña

const sendRecoveryPasswordEmail = async (email, token) => {
  const route = path.join(emailsFolder, '/recoverPassword.hbs');
  const emailTemplateSource = fs.readFileSync(route, 'utf8');
  const template = Handlebars.compile(emailTemplateSource);
  const htmlToSend = template({ url: `${process.env.FRONT_BASE_URL}/recover-password/${token}` });

  const recoveryPasswordMailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: email, // list of receivers
    subject: 'Recupera tu contraseña', // Subject line
    html: htmlToSend, // plain html body
  };

  return sendEmail(recoveryPasswordMailOptions);
};

module.exports = {
  sendActiveAccountEmail,
  sendBlockedAccountEmail,
  sendRecoveryPasswordEmail,
};
