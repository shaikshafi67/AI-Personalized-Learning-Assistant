// Basic input validation/sanitization helpers used across controllers

function isNonEmptyString(val, maxLen = 5000) {
  return typeof val === 'string' && val.trim().length > 0 && val.length <= maxLen;
}

function sanitizeString(val) {
  if (typeof val !== 'string') return '';
  // Strip basic HTML tags to reduce injection risk when rendered
  return val.replace(/<script.*?>.*?<\/script>/gi, '').trim();
}

// Middleware factory: validates that required string fields exist and are non-empty
function requireFields(fields) {
  return (req, res, next) => {
    const missing = [];
    for (const field of fields) {
      const val = req.body ? req.body[field] : undefined;
      if (!isNonEmptyString(typeof val === 'string' ? val : val != null ? String(val) : '', 8000)) {
        missing.push(field);
      }
    }
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing or invalid required field(s): ${missing.join(', ')}`,
      });
    }
    // sanitize string fields in place
    for (const field of fields) {
      if (typeof req.body[field] === 'string') {
        req.body[field] = sanitizeString(req.body[field]);
      }
    }
    next();
  };
}

module.exports = { isNonEmptyString, sanitizeString, requireFields };
