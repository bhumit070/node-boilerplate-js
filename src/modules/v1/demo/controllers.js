const { response } = require('../../../helpers/');

function helloWorld(req, res) {
  return response.success({ res });
}

module.exports = {
  helloWorld,
};
