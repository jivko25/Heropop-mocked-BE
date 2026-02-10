// In-memory mock list of codes associated with the current parent account
let codes = [
  {
    id: '1',
    code: 'ABCDEF-123456',
    status: 'active',
    activated_at: '2026-01-25T10:00:00.000Z',
    expires_at: '2026-02-25T10:00:00.000Z',
    assigned_child: {
      id: 'child-1',
      name: 'Алекс',
    },
  },
  {
    id: '2',
    code: 'XYZ-999999',
    status: 'expired',
    activated_at: '2025-12-01T10:00:00.000Z',
    expires_at: '2026-01-01T10:00:00.000Z',
    assigned_child: null,
  },
  {
    id: '3',
    code: 'ABCDEF-123457',
    status: 'active',
    activated_at: '2026-01-26T10:00:00.000Z',
    expires_at: '2026-02-26T10:00:00.000Z',
    assigned_child: null,
  },
  {
    id: '4',
    code: 'XYZ-999998',
    status: 'inactive',
    activated_at: '2025-12-01T10:00:00.000Z',
    expires_at: '2026-01-01T10:00:00.000Z',
    assigned_child: null,
  },
  {
    id: '5',
    code: 'XYZ-999997',
    status: 'expired',
    activated_at: '2025-12-01T10:00:00.000Z',
    expires_at: '2026-01-01T10:00:00.000Z',
    assigned_child: null,
  },
  {
    id: '6',
    code: 'XYZ-999996',
    status: 'active',
    activated_at: '2026-01-26T10:00:00.000Z',
    expires_at: '2026-02-26T10:00:00.000Z',
    assigned_child: null,
  },
];

// In-memory list of available codes that can be activated
const availableCodes = [
  { code: '123123123' },
  { code: 'XYZ-123' },
];

function normalizeCode(code) {
  return code.trim().toUpperCase().replace(/\s+/g, '');
}

// GET /api/codes
async function listCodes(req, res) {
  try {
    return res.status(200).json({ codes });
  } catch (err) {
    console.error('[MOCK] listCodes error', err);
    return res.status(500).json({
      error: 'Неуспешно зареждане на кодовете (mock).',
    });
  }
}

// POST /api/codes
async function addCode(req, res) {
  const { code } = req.body || {};

  if (!code || typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({
      error: 'Полето "code" е задължително.',
    });
  }

  const normalized = normalizeCode(code);

  // Check if code is in available codes
  const available = availableCodes.find(
    (c) => normalizeCode(c.code) === normalized
  );
  if (!available) {
    return res.status(400).json({
      error: 'Невалиден код (mock).',
    });
  }

  // Check if code already exists and is used (not inactive)
  const existing = codes.find((c) => normalizeCode(c.code) === normalized);
  if (existing && existing.status !== 'inactive') {
    return res.status(400).json({
      error: 'Кодът вече е използван (mock).',
    });
  }

  const now = new Date();
  const activated_at = now.toISOString();
  const expires_at = new Date(
    now.getTime() + 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  let codeObj;

  if (existing && existing.status === 'inactive') {
    existing.status = 'active';
    existing.activated_at = activated_at;
    existing.expires_at = expires_at;
    existing.assigned_child = null;
    codeObj = existing;
  } else {
    const nextId =
      codes.length > 0
        ? String(
            Math.max(
              ...codes.map((c) => {
                const n = Number(c.id);
                return Number.isNaN(n) ? 0 : n;
              })
            ) + 1
          )
        : '1';

    codeObj = {
      id: nextId,
      code: normalized,
      status: 'active',
      activated_at,
      expires_at,
      assigned_child: null,
    };

    codes.push(codeObj);
  }

  console.log('[MOCK] Code activated', codeObj);

  return res.status(201).json({
    message: 'Кодът е добавен успешно (mock).',
    code: codeObj,
  });
}

function findCodeById(id) {
  return codes.find((c) => c.id === id);
}

function findCodeAssignedToChild(childId) {
  return codes.find(
    (c) => c.assigned_child && c.assigned_child.id === String(childId)
  );
}

module.exports = {
  listCodes,
  addCode,
  findCodeById,
  findCodeAssignedToChild,
};

