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

async function sendMail() {
	await transporter.sendMail({
		from: 'Bhoomit Ganatra <bhoomit.dev@gmail.com>',
		to: 'ganatrabhoomit070@gmail.com',
		html: 'Hello, from <b>Nodejs JavaScript</b> boilerplate',
		text: 'Hello, from Nodejs JavaScript boilerplate',
		subject: 'NodeJs Boilerplate Mail',
	});
}

sendMail().finally(() => process.exit(0));

module.exports = {
	sendMail
};