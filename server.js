require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

require('./server/middlewares')(app);
require('./modules/routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. 🚀`);
});
