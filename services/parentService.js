const { findChildById } = require('./childrenService');

// In-memory mock AI sessions for children
let aiSessions = [
  {
    id: 'sess_1',
    child_id: '1',
    child_name: 'Алекс',
    title: 'Сподели с приятел – 21.01.2026',
    created_at: '2026-01-21T18:03:00Z',
    message_count: 23,
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Днес в училище се скарах с приятел...',
        created_at: '2026-01-21T18:03:10Z',
      },
      {
        id: 'm2',
        role: 'assistant',
        content:
          'Съжалявам, че си се почувствал така. Искаш ли да ми разкажеш повече?',
        created_at: '2026-01-21T18:03:25Z',
      },
      {
        id: 'm3',
        role: 'user',
        content: 'Искам да го накарам да се извини.',
        created_at: '2026-01-21T18:03:30Z',
      },
      {
        id: 'm4',
        role: 'assistant',
        content: 'Може би ще се наложи да поговорим с родителите му. Да помислим как да се справим с този проблем.',
        created_at: '2026-01-21T18:03:45Z',
      },
      {
        id: 'm5',
        role: 'user',
        content: 'Да, трябва да го накараме да се извини.',
        created_at: '2026-01-21T18:03:50Z',
      },
      {
        id: 'm6',
        role: 'assistant',
        content: 'Може би ще се наложи да поговорим с родителите му. Да помислим как да се справим с този проблем.',
        created_at: '2026-01-21T18:04:00Z',
      },
      {
        id: 'm7',
        role: 'user',
        content: 'Да, трябва да го накараме да се извини.',
        created_at: '2026-01-21T18:04:05Z',
      },
      {
        id: 'm8',
        role: 'assistant',
        content: 'Може би ще се наложи да поговорим с родителите му. Да помислим как да се справим с този проблем.',
        created_at: '2026-01-21T18:04:10Z',
      },
      {
        id: 'm9',
        role: 'user',
        content: 'Да, трябва да го накараме да се извини.',
        created_at: '2026-01-21T18:04:15Z',
      },
      {
        id: 'm10',
        role: 'assistant',
        content: 'Може би ще се наложи да поговорим с родителите му. Да помислим как да се справим с този проблем.',
        created_at: '2026-01-21T18:04:20Z',
      },
      {
        id: 'm11',
        role: 'user',
        content: 'Да, трябва да го накараме да се извини.',
        created_at: '2026-01-21T18:04:25Z',
      },
      {
        id: 'm12',
        role: 'assistant',
        content: 'Може би ще се наложи да поговорим с родителите му. Да помислим как да се справим с този проблем.',
        created_at: '2026-01-21T18:04:30Z',
      },
      {
        id: 'm13',
        role: 'user',
        content: 'Да, трябва да го накараме да се извини.',
        created_at: '2026-01-21T18:04:35Z',
      },
    ],
    summary: {
      text: 'В този разговор детето споделя за конфликт с приятел в училище, за чувства на тъга и несигурност. AI го насочва към изразяване на емоциите и предлага стъпки за помирение.',
      created_at: '2026-01-21T18:10:00Z',
    },
  },
  {
    id: 'sess_2',
    child_id: '1',
    child_name: 'Алекс',
    title: 'Дневник – 20.01.2026',
    created_at: '2026-01-20T19:20:00Z',
    message_count: 15,
    messages: [],
    summary: null,
  },
  {
    id: 'sess_3',
    child_id: '1',
    child_name: 'Алекс',
    title: 'Дневник – 19.01.2026',
    created_at: '2026-01-19T19:00:00Z',
    message_count: 10,
    messages: [],
    summary: null,
  },
  {
    id: 'sess_4',
    child_id: '1',
    child_name: 'Алекс',
    title: 'Сподели с приятел – 18.01.2026',
    created_at: '2026-01-18T19:00:00Z',
    message_count: 12,
    messages: [],
    summary: null,
  },
  {
    id: 'sess_5',
    child_id: '1',
    child_name: 'Алекс',
    title: 'Дневник – 17.01.2026',
    created_at: '2026-01-17T19:00:00Z',
    message_count: 8,
    messages: [],
    summary: null,
  },
];

// GET /api/parent/children/:childId/dashboard
async function getChildDashboard(req, res) {
  const { childId } = req.params;

  try {
    const child = findChildById(childId);
    const childName = child?.name || 'Алекс';
    const resolvedChildId = child?.id || String(childId);

    const sessionsForChild = aiSessions
      .filter((s) => s.child_id === resolvedChildId)
      .sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

    const lastDiarySessions = sessionsForChild.slice(0, 5).map((s) => ({
      id: s.id,
      title: s.title,
      created_at: s.created_at,
    }));

    const dashboard = {
      child_id: resolvedChildId,
      child_name: childName,
      last_login_at: '2026-01-20T19:42:00Z',
      last_ai_diary_at: '2026-01-22T08:15:00Z',

      recent_menu_activity: [
        'diary_share_friend',
        'ai_friend_games',
        'profile_settings',
      ],

      favorite_ai_category: 'diary_share_friend',
      favorite_ai_category_label: 'Дневник / Сподели с приятел',

      last_diary_sessions: lastDiarySessions,

      mood_trend: [
        { date: '2026-01-18', index: 2 },
        { date: '2026-01-19', index: 3 },
        { date: '2026-01-20', index: 4 },
        { date: '2026-01-21', index: 5 },
        { date: '2026-01-22', index: 4 },
      ],

      current_interests: {
        period_start: '2026-01-18',
        period_end: '2026-01-22',
        summary:
          'Текстово заключение за интересите на детето, генерирано от AI.',
        source_session_ids: lastDiarySessions.map((s) => s.id),
      },
    };

    return res.status(200).json(dashboard);
  } catch (err) {
    console.error('[MOCK] getChildDashboard error', err);
    return res
      .status(500)
      .json({ error: 'Неуспешно зареждане на дашборда (mock).' });
  }
}

// GET /api/parent/children/:childId/ai-sessions
async function listChildAiSessions(req, res) {
  const { childId } = req.params;
  const page = parseInt(req.query.page || '1', 10);
  const perPage = parseInt(req.query.per_page || '20', 10);

  try {
    const childSessions = aiSessions
      .filter((s) => s.child_id === String(childId))
      .sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

    const total = childSessions.length;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const slice = childSessions.slice(start, end);

    const items = slice.map((s) => ({
      id: s.id,
      title: s.title,
      created_at: s.created_at,
      message_count: s.message_count,
      has_summary: Boolean(s.summary),
    }));

    const meta = {
      page,
      per_page: perPage,
      total,
      has_more: end < total,
    };

    return res.status(200).json({ items, meta });
  } catch (err) {
    console.error('[MOCK] listChildAiSessions error', err);
    return res
      .status(500)
      .json({ error: 'Неуспешно зареждане на AI сесиите (mock).' });
  }
}

function findAiSessionById(id) {
  return aiSessions.find((s) => s.id === id);
}

// GET /api/parent/children/:childId/ai-sessions/:sessionId
async function getChildAiSession(req, res) {
  const { childId, sessionId } = req.params;

  const session = findAiSessionById(sessionId);
  if (!session || session.child_id !== String(childId)) {
    return res
      .status(404)
      .json({ error: 'AI session not found (mock).' });
  }

  const { messages, summary, ...rest } = session;

  return res.status(200).json({
    ...rest,
    child_id: session.child_id,
    child_name: session.child_name,
    messages,
    summary: summary || null,
  });
}

// POST /api/parent/children/:childId/ai-sessions/:sessionId/summary
async function generateChildAiSessionSummary(req, res) {
  const { childId, sessionId } = req.params;

  const session = findAiSessionById(sessionId);
  if (!session || session.child_id !== String(childId)) {
    return res
      .status(404)
      .json({ error: 'AI session not found (mock).' });
  }

  if (session.summary) {
    // Already has summary, just return it
    return res.status(200).json({ summary: session.summary });
  }

  const created_at = new Date().toISOString();
  const summary = {
    text: 'Кратко, 3-5 изречения резюме на разговора, генерирано от AI.',
    created_at,
  };

  session.summary = summary;

  return res.status(200).json({ summary });
}

// --- Child-facing AI session (Дневник / Сподели с най-добър приятел) ---
// GET /api/ai-sessions/current – current session for active child
// POST /api/ai-sessions/send-message – send message, get answer, store in session

function getCurrentSessionForChild(childId) {
  const sid = String(childId);
  const list = aiSessions
    .filter((s) => s.child_id === sid)
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  const session = list[0];
  if (!session) {
    return { id: null, title: null, created_at: null, messages: [] };
  }
  return {
    id: session.id,
    title: session.title,
    created_at: session.created_at,
    messages: (session.messages || []).map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      created_at: m.created_at,
    })),
  };
}

function nextSessionId() {
  const numeric = aiSessions.reduce((max, s) => {
    const n = parseInt(String(s.id).replace(/^sess_/, ''), 10);
    return isNaN(n) ? max : Math.max(max, n);
  }, 0);
  return `sess_${numeric + 1}`;
}

function nextMessageId(session) {
  const msgs = session.messages || [];
  const numeric = msgs.reduce((max, m) => {
    const n = parseInt(String(m.id).replace(/^m/, ''), 10);
    return isNaN(n) ? max : Math.max(max, n);
  }, 0);
  return `m${numeric + 1}`;
}

// Mock AI reply based on user content and optional context
function mockAiReply(userContent, _previousMessages) {
  const lower = (userContent || '').toLowerCase();
  if (lower.includes('как си') || lower.includes('здравей')) {
    return 'Здравей! Добре съм, благодаря. С какво мога да ти помогна днес?';
  }
  if (lower.includes('тъжен') || lower.includes('тъжно') || lower.includes('съжалявам')) {
    return 'Съжалявам, че се чувстваш така. Искаш ли да ми разкажеш повече? Винаги съм тук за теб.';
  }
  if (lower.includes('приятел') || lower.includes('скарах')) {
    return 'Понякога се караме с приятелите си. Важно е да говорим и да се извиняваме. Искаш ли да помислим заедно как да се помириш?';
  }
  return 'Това е интересно! Разкажи ми още, ако искаш. Аз съм тук да те слушам и да помагам.';
}

async function sendMessageForChild(childId, content) {
  const sid = String(childId);
  const trimmed =
    typeof content === 'string' ? content.trim() : '';
  if (!trimmed) {
    return { error: 'content е задължително', status: 400 };
  }

  let session = aiSessions
    .filter((s) => s.child_id === sid)
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )[0];

  const now = new Date().toISOString();
  if (!session) {
    const title = `Дневник – ${now.slice(0, 10)}`;
    session = {
      id: nextSessionId(),
      child_id: sid,
      child_name: 'Алекс',
      title,
      created_at: now,
      message_count: 0,
      messages: [],
      summary: null,
    };
    aiSessions.push(session);
  }

  if (!session.messages) session.messages = [];

  const userMsgId = nextMessageId(session);
  session.messages.push({
    id: userMsgId,
    role: 'user',
    content: trimmed,
    created_at: now,
  });

  const previousMessages = session.messages.slice(-10).map((m) => ({ role: m.role, content: m.content }));
  const answer = mockAiReply(trimmed, previousMessages);

  const assistantMsgId = nextMessageId(session);
  const assistantNow = new Date().toISOString();
  session.messages.push({
    id: assistantMsgId,
    role: 'assistant',
    content: answer,
    created_at: assistantNow,
  });

  session.message_count = session.messages.length;

  const mockAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  return {
    answer,
    // audio_url: mockAudioUrl,
    session_id: session.id,
  };
}

// In-memory notification settings for parent
let notificationSettings = {
  email_frequency: 'weekly',
};

const ALLOWED_EMAIL_FREQUENCIES = ['never', 'daily', 'weekly', 'monthly'];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// GET /api/parent/notification-settings
async function getNotificationSettings(req, res) {
  try {
    await delay(300);
    return res.status(200).json({
      email_frequency: notificationSettings.email_frequency,
    });
  } catch (err) {
    console.error('[MOCK] getNotificationSettings error', err);
    return res.status(500).json({
      error: 'Неуспешно зареждане на настройките (mock).',
    });
  }
}

// PUT /api/parent/notification-settings
async function updateNotificationSettings(req, res) {
  try {
    await delay(300);

    const { email_frequency } = req.body || {};

    if (!email_frequency || typeof email_frequency !== 'string') {
      return res.status(422).json({
        message: 'Полето email_frequency е задължително',
        errors: {
          email_frequency: ['Полето email_frequency е задължително'],
        },
      });
    }

    if (!ALLOWED_EMAIL_FREQUENCIES.includes(email_frequency)) {
      return res.status(422).json({
        message: 'Невалидна стойност за честота',
        errors: {
          email_frequency: [
            'Полето email_frequency трябва да е една от стойностите: never, daily, weekly, monthly',
          ],
        },
      });
    }

    notificationSettings.email_frequency = email_frequency;

    return res.status(200).json({
      email_frequency,
      message: 'Настройките бяха успешно обновени',
    });
  } catch (err) {
    console.error('[MOCK] updateNotificationSettings error', err);
    return res.status(500).json({
      error: 'Неуспешно обновяване на настройките (mock).',
    });
  }
}

module.exports = {
  getChildDashboard,
  listChildAiSessions,
  getChildAiSession,
  generateChildAiSessionSummary,
  getNotificationSettings,
  updateNotificationSettings,
  getCurrentSessionForChild,
  sendMessageForChild,
};

