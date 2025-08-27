const crypto = require('crypto');

/**
 * Sign an HTTP request using HMAC-SHA256.
 * @param {Object} headers - HTTP headers object.
 * @param {string|Buffer} body - Request body.
 * @param {string} secret - Shared secret key for HMAC.
 * @returns {string} Hex encoded signature.
 */
function signRequest(headers, body, secret) {
  const payload = JSON.stringify({ headers, body });
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

module.exports = { signRequest };
