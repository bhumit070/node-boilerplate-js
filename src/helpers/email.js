const nodemailer = require('nodemailer');
const logger = require('./logger');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const Transporter = require('nodemailer/lib/mailer/index');
const { config } = require('../config/');

async function sendEmail(data) {
  let isEmailSent = true;
  let transporter;

  try {
    if (!data.text && !data.html) {
      return false;
    }

    transporter = nodemailer.createTransport({
      host: config.MAIL_HOST,
      port: config.MAIL_PORT,
      secure: false,
      auth: {
        user: config.MAIL_USERNAME,
        pass: config.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `${config.MAIL_DISPLAY_NAME} <${config.MAIL_FROM}>`,
      to: data.receiver,
      subject: data.subject,
      html: data.html,
      text: data.text,
    });
  } catch (error) {
    logger.error(error);
    isEmailSent = false;
  } finally {
    if (transporter !== undefined) {
      transporter.close();
    }
  }
  return isEmailSent;
}

module.exports = { sendEmail };
