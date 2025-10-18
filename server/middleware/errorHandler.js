const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors.map(e => e.message)
    });
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: 'Duplicate entry',
      details: err.errors.map(e => e.message)
    });
  }

  // Sequelize database connection error
  if (err.name === 'SequelizeConnectionError') {
    return res.status(500).json({
      error: 'Database connection error'
    });
  }

  // Default error
  res.status(500).json({
    error: 'Internal server error'
  });
};

module.exports = errorHandler;
