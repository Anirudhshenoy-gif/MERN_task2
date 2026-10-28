const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Email already registered',
    });
  }

  // Handle Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
};

module.exports = errorHandler;
