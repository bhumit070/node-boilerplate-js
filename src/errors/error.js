class CustomError extends Error {
  code;
  constructor(
    message = 'Something went wrong, please try again later',
    status = 500
  ) {
    super(message);
    this.message = message;
    this.code = status;
  }
}

module.exports = { CustomError };
