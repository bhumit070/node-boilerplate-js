require('dotenv').config();
require('./db/mongodb/');
const express = require('express');
const { logger } = require('./server/logger');
const app = express();

const PORT = process.env.PORT || 8000;

require('./server/middlewares')(app);
require('./modules/routes')(app);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}. 🚀`);
});
