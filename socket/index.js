const socketIo = require('socket.io');
const socketMiddlewares = require('./middlewares');
const SocketUser = require('./SocketUser');
class Socket {
	constructor(app) {
		this.io = new socketIo.Server(app);
		this.init();
	}

	init() {
		this.io.use(socketMiddlewares.isAuthenticated.bind(this));
		this.io.on('connection', (socket) => {
			new SocketUser(this.io, socket);
		});
	}
}

module.exports = (app) => new Socket(app);