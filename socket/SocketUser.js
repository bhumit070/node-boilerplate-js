const { UserModel } = require('../db/mongodb/models');
const { redisClient } = require('../db/redis');
const { responseGenerator } = require('../helpers').responseHelpers;
class SocketUser {
	constructor(io, socket) {
		this.io = io;
		this.socket = socket;
		this.getUser();
	}

	async getUser() {
		try {
			const socketId = this.socket.id;
			const userId = await redisClient.get(socketId);
			if(!userId) {
				this.socket.disconnect();
				return;
			}
			const user = await UserModel.findById(userId);
			this.socket.user = user;
			this.init();
		} catch (error) {
			this.io.to(this.socket.id).emit('server-error', responseGenerator({ error, message: 'Error in connecting to socket' }));
			this.socket.disconnect();
		}
	}

	async handleSocketDisconnect() {
		await redisClient.del(this.socket.id);
	}

	init() {
		this.socket.on('disconnect', this.handleSocketDisconnect.bind(this));
	}

}

module.exports = SocketUser;