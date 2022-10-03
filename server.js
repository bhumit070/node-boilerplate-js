require('dotenv').config();
const { logger } = require('./server/logger');
const http = require('http');
const app = require('express')();
const server = http.createServer(app);

require('./db/mongodb/');
require('./db/redis');
require('./server/middlewares')(app);
require('./modules/routes')(app);
require('./socket')(server);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}. 🚀`);
});
