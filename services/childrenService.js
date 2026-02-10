// In-memory mock list of child profiles
let children = [
  {
    id: '1',
    name: 'Алекс',
    avatar_url: null,
    is_active: true,
    age: 8,
    interests: 'игри, рисуване',
    ai_restrictions: 'без войни, без хорър',
    avatar_key: 'bear',
  },
  {
    id: '2',
    name: 'Мария',
    avatar_url: null,
    is_active: false,
    age: 7,
    interests: 'рисуване, балет',
    ai_restrictions: 'без страшни истории',
    avatar_key: 'unicorn',
  },
];

const { findCodeById, findCodeAssignedToChild } = require('./codesService');

// GET /api/children
async function listChildren(req, res) {
  try {
    return res.status(200).json({ children });
  } catch (err) {
    console.error('[MOCK] listChildren error', err);
    return res
      .status(500)
      .json({ error: 'Something went wrong while fetching children (mock).' });
  }
}

function findChildById(id) {
  return children.find((c) => c.id === id);
}

// GET /api/children/:id
async function getChild(req, res) {
  const { id } = req.params;

  const child = findChildById(id);
  if (!child) {
    return res
      .status(404)
      .json({ error: 'Child profile not found (mock).' });
  }

  return res.status(200).json({ child });
}

// DELETE /api/children/:id
async function deleteChild(req, res) {
  const { id } = req.params;

  const existing = findChildById(id);
  if (!existing) {
    return res
      .status(404)
      .json({ error: 'Child profile not found (mock).' });
  }

  children = children.filter((c) => c.id !== id);

  console.log('Child deleted', id);
  

  return res
    .status(200)
    .json({ message: 'Детският профил е изтрит (mock).' });
}

// POST /api/children/:id/deactivate
async function toggleChildActive(req, res) {
  const { id } = req.params;

  const child = findChildById(id);
  if (!child) {
    return res
      .status(404)
      .json({ error: 'Child profile not found (mock).' });
  }

  child.is_active = !child.is_active;

  console.log('Child status changed', id, child.is_active);

  return res.status(200).json({
    message: 'Статусът на профила е променен (mock).',
    child,
  });
}

// PUT /api/children/:id
async function updateChild(req, res) {
  const { id } = req.params;
  const {
    name,
    avatar_url,
    is_active,
    age,
    interests,
    ai_restrictions,
    avatar_key,
    code_id,
  } = req.body || {};

  const hasAnyField =
    typeof name !== 'undefined' ||
    typeof avatar_url !== 'undefined' ||
    typeof is_active !== 'undefined' ||
    typeof age !== 'undefined' ||
    typeof interests !== 'undefined' ||
    typeof ai_restrictions !== 'undefined' ||
    typeof avatar_key !== 'undefined' ||
    typeof code_id !== 'undefined';

  if (!hasAnyField) {
    return res.status(400).json({
      error:
        'At least one field (name, avatar_url, is_active, age, interests, ai_restrictions, avatar_key, code_id) is required (mock).',
    });
  }

  const child = findChildById(id);
  if (!child) {
    return res
      .status(404)
      .json({ error: 'Child profile not found (mock).' });
  }

  // Update basic fields
  if (typeof name === 'string') {
    child.name = name;
  }
  if (typeof avatar_url !== 'undefined') {
    child.avatar_url = avatar_url;
  }
  if (typeof is_active === 'boolean') {
    child.is_active = is_active;
  }
  if (typeof age !== 'undefined') {
    child.age = age;
  }
  if (typeof interests !== 'undefined') {
    child.interests = interests;
  }
  if (typeof ai_restrictions !== 'undefined') {
    child.ai_restrictions = ai_restrictions;
  }
  if (typeof avatar_key !== 'undefined') {
    child.avatar_key = avatar_key;
  }

  // Handle code_id logic
  const previousCode = findCodeAssignedToChild(child.id);

  if (typeof code_id === 'undefined' || code_id === null) {
    // No change to code association; just update child name on the current code if exists
    if (previousCode && previousCode.assigned_child) {
      previousCode.assigned_child.name = child.name;
    }
  } else {
    const codeIdStr = String(code_id);

    if (previousCode && previousCode.id === codeIdStr) {
      // Same code, just update child name
      if (previousCode.assigned_child) {
        previousCode.assigned_child.name = child.name;
      }
    } else {
      const newCode = findCodeById(codeIdStr);
      if (!newCode) {
        return res
          .status(400)
          .json({ error: 'Кодът не съществува (mock).' });
      }

      if (!['active', 'inactive'].includes(newCode.status)) {
        return res
          .status(400)
          .json({ error: 'Кодът не е валиден за използване (mock).' });
      }

      if (
        newCode.assigned_child &&
        String(newCode.assigned_child.id) !== String(child.id)
      ) {
        return res.status(400).json({
          error: 'Кодът вече е асоцииран с друго дете (mock).',
        });
      }

      // Detach old code if different
      if (previousCode && previousCode.id !== newCode.id) {
        previousCode.assigned_child = null;
      }

      // Attach new code
      newCode.assigned_child = {
        id: child.id,
        name: child.name,
      };

      newCode.status = 'active';
    }
  }

  console.log('Child updated', id, child);

  return res.status(200).json({
    message: 'Детският профил е обновен (mock).',
    child,
  });
}

// POST /api/children
async function createChild(req, res) {
  const {
    name,
    avatar_url = null,
    is_active = true,
    age,
    interests,
    ai_restrictions,
    avatar_key,
    code_id,
  } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      error: 'Полето "name" е задължително.',
    });
  }

  const nextId =
    children.length > 0
      ? String(
          Math.max(
            ...children.map((c) => {
              const n = Number(c.id);
              return Number.isNaN(n) ? 0 : n;
            })
          ) + 1
        )
      : '1';

  const child = {
    id: nextId,
    name: name.trim(),
    avatar_url,
    is_active: Boolean(is_active),
    age,
    interests,
    ai_restrictions,
    avatar_key,
  };

  children.push(child);

  // Code association logic (optional)
  if (typeof code_id !== 'undefined' && code_id !== null) {
    const codeIdStr = String(code_id);
    const code = findCodeById(codeIdStr);

    if (!code) {
      return res.status(400).json({
        error: 'Кодът не съществува (mock).',
      });
    }

    if (!['active', 'inactive'].includes(code.status)) {
      return res.status(400).json({
        error: 'Кодът не е валиден за използване (mock).',
      });
    }

    if (
      code.assigned_child &&
      String(code.assigned_child.id) !== String(child.id)
    ) {
      return res.status(400).json({
        error: 'Кодът вече е асоцииран с друго дете (mock).',
      });
    }

    code.assigned_child = {
      id: child.id,
      name: child.name,
    };

    code.status = 'active';
  }

  console.log('Child created', child);

  return res.status(201).json({
    message: 'Детският профил е създаден (mock).',
    child,
  });
}

module.exports = {
  listChildren,
  getChild,
  deleteChild,
  toggleChildActive,
  updateChild,
  createChild,
  findChildById,
};

