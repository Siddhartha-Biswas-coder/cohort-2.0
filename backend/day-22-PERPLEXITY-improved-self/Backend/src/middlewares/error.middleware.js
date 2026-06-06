/**
 * Global Express error handling middleware
 * @param {Error|Object} err - Error object thrown in controllers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function callback
 * @returns {Object} - Express response containing the error details
 */
const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
