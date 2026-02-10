// This service contains the full logic of the /auth endpoints.
// Each function is an Express handler or middleware, just like in your real backend.

const { findChildById } = require('./childrenService');

// Internal helper for building the mock user object
function createMockUser(email, fullName) {
  const { getPinMeta } = require('./pinService');
  const { has_pin, pin_status, is_parent } = getPinMeta();

  const resolvedFullName =
    fullName && typeof fullName === 'string' && fullName.trim().length > 0
      ? fullName.trim()
      : 'Mock User';

  return {
    id: 1,
    email,
    user_email: email, // for compatibility with older responses
    fullName: resolvedFullName,
    display_name: resolvedFullName,
    has_pin,
    pin_status,
    is_parent,
  };
}

// POST /api/auth/register
// Очаква същите полета, които фронтендът подава от формата:
// { email, fullName, password, termsAccepted }
async function register(req, res) {
  const { email, password, fullName, termsAccepted } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email и парола са задължителни.' });
  }

  // full name идва като fullName от формата
  if (!fullName) {
    return res
      .status(400)
      .json({ error: 'Пълното име (full name) е задължително.' });
  }

  // terms се очакват като termsAccepted (boolean) от фронтенда
  if (!termsAccepted) {
    return res
      .status(400)
      .json({ error: 'Трябва да приемете общите условия (terms).' });
  }

  // Mock user creation using full name
  const user = createMockUser(email, fullName);

  return res
    .status(201)
    .json({ message: 'Регистрацията е успешна (mock).', user });
}

// POST /api/auth/login
async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email и парола са задължителни.' });
  }

  // Mock successful login
  const user = createMockUser(email);

  const data = {
    session: {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
    },
    user,
  };

  return res.status(200).json(data);
}

// POST /api/auth/resend-confirmation
async function resendConfirmation(req, res) {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email е задължителен.' });
  }

  // Тук реално би се изпратил имейл за потвърждение; ние само мокваме
  return res
    .status(200)
    .json({ message: 'Потвърждаващ имейл е изпратен отново (mock).' });
}

// POST /api/auth/push-token
async function savePushToken(req, res) {
  const { pushToken } = req.body || {};

  if (!pushToken) {
    return res.status(400).json({ error: 'pushToken е задължителен.' });
  }

  const userId = req.user?.id || 'mock-user-id';

  console.log('Mock save push token', { userId, pushToken });

  return res.status(200).json({
    message: 'Push токенът е записан успешно (mock).',
    pushToken,
    userId,
  });
}

// Middleware за "проверка" на сесията
async function verifySession(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      error: 'unauthorized',
      message: 'Invalid or expired token',
    });
  }

  // В реалния бекенд тук проверяваш токена; ние просто мокваме
  if (token !== 'mock-access-token' && token !== 'mock-refresh-token') {
    return res.status(401).json({
      error: 'unauthorized',
      message: 'Invalid or expired token',
    });
  }

  // Прикачваме mock user към заявката
  req.user = {
    id: 'mock-user-id',
    email: 'mock@example.com',
  };

  return next();
}

// POST /api/auth/me
async function getMe(req, res) {
  const refreshToken = req.headers.authorization?.replace('Bearer ', '');

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is missing.' });
  }

  if (refreshToken !== 'mock-refresh-token') {
    return res.status(401).json({ error: 'Failed to refresh session (mock).' });
  }

  const { getPinMeta } = require('./pinService');
  const { has_pin, pin_status, is_parent } = getPinMeta();

  const fullName = 'Mock User';
  const childIdFromHeader = req.headers['x-child-id'];
  let childData = null;

  if (childIdFromHeader) {
    const child = findChildById(childIdFromHeader);
    if (child) {
      childData = child;
    }
  }

  // If we are viewing a specific child (X-Child-Id), we are NOT a parent in the app context.
  // If there is no child, we also keep is_parent=false for now (parent flow is not used in this mock).
  let effectiveIsParent = is_parent;
  if (childData) {
    effectiveIsParent = false;
  } else {
    effectiveIsParent = true;
  }

  const user = {
    id: 'mock-user-id',
    email: 'mock@example.com',
    display_name: fullName,
    fullName,
    has_pin,
    pin_status,
    is_parent: effectiveIsParent,
    childData,
  };

  return res.status(200).json({
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    user,
  });
}

// POST /api/auth/reset-password
async function resetPassword(req, res) {
  const { email } = req.body || {};

  
  if (!email) {
    return res.status(400).json({ error: 'Email е задължителен.' });
  }
  
  if (email === 'error@example.com') {
    return res.status(400).json({ error: 'Възникна грешка при изпращането на имейл за ресет на парола.' });
  }

  return res.status(200).json({
    message: 'Линк за ресет на парола е изпратен успешно (mock).',
  });
}

// POST /api/auth/password/change
async function changePassword(req, res) {
  const { password } = req.body || {};

  // Basic validation for mocked endpoint
  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      error: 'invalid_password',
      message: 'Password does not meet complexity requirements',
    });
  }

  const hasMinLength = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (!(hasMinLength && hasLower && hasUpper && hasDigit && hasSpecial)) {
    return res.status(400).json({
      error: 'invalid_password',
      message: 'Password does not meet complexity requirements',
    });
  }

  // Simulate an internal error for testing
  if (password === 'error-password') {
    console.error('[MOCK] Failed to change password for user', req.user?.id);
    return res.status(500).json({
      error: 'server_error',
      message: 'Something went wrong while changing password',
    });
  }

  // In a real implementation, you would hash and store the password here
  console.log('[MOCK] Password changed for user', req.user?.id);

  return res.status(200).json({
    message: 'Password changed successfully',
  });
}

// POST /api/auth/email/change-request
async function requestEmailChange(req, res) {
  const email = req.user?.email;

  if (email === 'error-email@example.com') {
    return res.status(400).json({ error: 'Възникна грешка при изпращането на имейл за промяна на имейл.' });
  }

  if (!email) {
    return res.status(400).json({ error: 'Email е задължителен.' });
  }

  // Simulate sending an email
  console.log('[MOCK] Email change link would be sent to', email);

  return res.status(200).json({
    message: 'Email change link sent',
  });
}

// POST /api/auth/logout
async function logout(req, res) {
  const userId = req.user?.id;
  console.log('logout userId', userId);

  if (!userId) {
    return res.status(401).json({ error: 'Потребителят не е автентикиран (mock).' });
  }

  // Тук бихме изтрили push токени/сесии; за mock просто връщаме success
  return res
    .status(200)
    .json({ message: 'Изходът е успешен, пуш токените (mock) са изтрити.' });
}

module.exports = {
  register,
  login,
  resendConfirmation,
  savePushToken,
  verifySession,
  getMe,
  resetPassword,
  changePassword,
  requestEmailChange,
  logout,
};

