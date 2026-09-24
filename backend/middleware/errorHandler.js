// Centralized error handler — always returns clean JSON, never leaks stack traces
function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err && err.message ? err.message : err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: status === 500 ? 'Internal server error. Please try again later.' : err.message,
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
}

module.exports = { errorHandler, notFoundHandler };
