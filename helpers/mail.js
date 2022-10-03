const nodemailer = require('nodemailer');
const { constants } = require('../config');
const transporter = nodemailer.createTransport({
  pool: true,
  host: constants.MAIL_HOST,
  port: constants.MAIL_PORT,
  secure: true,
  auth: {
    user: constants.MAIL_USERNAME,
    pass: constants.MAIL_PASSWORD,
  },
});

async function sendMail(to) {
	await transporter.sendMail({
		from: `${constants.MAIL_DISPLAY_NAME} <${constants.MAIL_FROM}>`,
		to,
		html: 'Hello, from <b>Nodejs JavaScript</b> boilerplate',
		text: 'Hello, from Nodejs JavaScript boilerplate',
		subject: 'NodeJs Boilerplate Mail',
	});
}


module.exports = {
	sendMail
};