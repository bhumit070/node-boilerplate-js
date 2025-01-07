const { Response } = require('express');

function handleData(data, isError = false) {
  if (!data.data) {
    data.data = {};
  }

  const payload = {
    message: data?.message || (isError ? 'Error' : 'Success'),
    error: isError,
  };

  data.data = payload;
}

function success({ res, ...data }) {
  data.code = data.code || 200;
  handleData(data);
  return res.status(data.code).json(data.data);
}
function error({ res, ...data }) {
  data.code = data.code || 500;
  handleData(data, true);
  return res.status(data.code).json(data);
}

module.exports = {
  success,
  error,
};
