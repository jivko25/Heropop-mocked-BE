const HARD_CODED_PIN = '1234';

// Simple meta used by authService for login/me responses
function getPinMeta() {
  return {
    has_pin: true,
    pin_status: 'set', // "missing" | "set" | "reset_required"
    is_parent: false, // treat user as parent for testing parent flow
  };
}

function isPinNumeric(pin) {
  return typeof pin === 'string' && /^[0-9]+$/.test(pin);
}

function validatePin(pin, res) {
  if (!pin && pin !== '0') {
    res.status(400).json({ error: 'ПИН е задължителен.' });
    return false;
  }

  if (!isPinNumeric(pin) || pin.length < 4) {
    res.status(400).json({ error: 'ПИН трябва да съдържа поне 4 цифри.' });
    return false;
  }

  return true;
}

// POST /api/auth/pin/setup
// Mock: just validates that a PIN is sent and looks valid
async function setupPin(req, res) {
  const { pin } = req.body || {};

  if (!validatePin(pin, res)) return;

  const meta = getPinMeta();

  const user = {
    id: req.user?.id || 1,
    email: req.user?.email || 'mock@example.com',
    ...meta,
  };

  return res.status(200).json({
    message: 'ПИН е създаден успешно.',
    user,
  });
}

// POST /api/auth/pin/verify
// Mock: PIN is valid only if it equals HARD_CODED_PIN
async function verifyPin(req, res) {
  const { pin } = req.body || {};

  if (!validatePin(pin, res)) return;

  if (pin !== HARD_CODED_PIN) {
    return res.status(400).json({ error: 'Невалиден ПИН.' });
  }

  return res.status(200).json({
    message: 'ПИНът е валиден.',
  });
}

// POST /api/auth/pin/forgot
// Mock: uses authenticated user's email; optionally simulate error
async function forgotPin(req, res) {
  const email = req.user?.email || 'mock@example.com';

  if (!email || email === 'error-pin@example.com') {
    return res.status(400).json({
      error: 'Възникна грешка при изпращането на имейл за ресет на ПИН.',
    });
  }

  return res.status(200).json({
    message: 'Имейл за ресет на ПИН е изпратен успешно.',
  });
}

module.exports = {
  setupPin,
  verifyPin,
  forgotPin,
  getPinMeta,
};

