// GET /api/facts/categories – list of categories for interesting facts
// POST /api/facts/generate – generate facts by category_id (mock: text + audio_url)

function getCurrentChildId(req) {
  const childIdFromHeader = req.headers['x-child-id'];
  if (childIdFromHeader) return String(childIdFromHeader);
  return '1';
}

const FACTS_CATEGORIES = [
  { id: 1, text: 'Космос', color: '#10B981', emoji: '🪐' },
  { id: 2, text: 'Животни', color: '#F59E0B', emoji: '🐾' },
  { id: 3, text: 'Природа', color: '#22C55E', emoji: '🌿' },
  { id: 4, text: 'Наука', color: '#0EA5E9', emoji: '🔬' },
  { id: 5, text: 'История', color: '#8B5CF6', emoji: '📜' },
  { id: 6, text: 'География', color: '#6366F1', emoji: '🌍' },
];

const MOCK_FACTS_BY_CATEGORY = {
  1: {
    text: 'Знаеше ли, че Слънцето е толкова голямо, че в него могат да се поберат над милион Земи? А планетата Юпитер има Велика червена петна – буря, която трае вече стотици години!',
  },
  2: {
    text: 'Знаеше ли, че октоподът има три сърца и кръвта му е синя? Котките мъркат само когато комуникират с хора – помежду си не мъркат почти никога.',
  },
  3: {
    text: 'Знаеше ли, че едно дърво произвежда достатъчно кислород за двама до четирима души за един ден? А бананите всъщност са билки, а не плодове – защото растят на „бананово дърво“, което е всъщност гигантска трева!',
  },
  4: {
    text: 'Знаеше ли, че светлината от Слънцето до Земята пътува около 8 минути? Мозъкът ни използва приблизително колкото енергия, колкото една малка електрическа крушка – около 20 вата.',
  },
  5: {
    text: 'Знаеше ли, че пирамидите в Египет са построени преди над 4500 години? Древните римляни са измислили първите централно отоплявани подове – наричали са ги хипокауст.',
  },
  6: {
    text: 'Знаеше ли, че в океаните има над 20 милиона тона злато, разтворено във водата? Най-дългата планина на Земята всъщност е под водата – Средноатлантическият хребет е над 16 000 км дълъг.',
  },
};

async function getCategories(req, res) {
  try {
    return res.status(200).json({
      categories: FACTS_CATEGORIES.map((c) => ({
        id: c.id,
        text: c.text,
        color: c.color,
        emoji: c.emoji,
      })),
    });
  } catch (err) {
    console.error('[MOCK] getFactsCategories error', err);
    return res.status(500).json({
      error: 'Неуспешно зареждане на категориите за факти (mock).',
    });
  }
}

async function generateFacts(req, res) {
  try {
    getCurrentChildId(req); // context for future use
    const { category_id: categoryId } = req.body || {};

    const id =
      categoryId !== undefined && categoryId !== null
        ? typeof categoryId === 'string'
          ? parseInt(categoryId, 10)
          : Number(categoryId)
        : NaN;

    if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: 'category_id е задължително и трябва да е валиден идентификатор на категория.',
      });
    }

    const category = FACTS_CATEGORIES.find((c) => c.id === id);
    if (!category) {
      return res.status(400).json({
        error: 'Невалидна категория.',
      });
    }

    const factsData = MOCK_FACTS_BY_CATEGORY[id] || {
      text: `Знаеше ли, че категория „${category.text}" е пълна с интересни факти? Опитай отново или избери друга категория!`,
    };

    // Mock: backend would call AI with category + rules (child-safe, limited length), then TTS for audio
    const mockAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

    return res.status(200).json({
      // audio_url: null,
      audio_url: mockAudioUrl,
      text: factsData.text,
      content: factsData.text,
    });
  } catch (err) {
    console.error('[MOCK] generateFacts error', err);
    return res.status(500).json({
      error: 'Грешка при генериране на интересни факти (mock).',
    });
  }
}

module.exports = {
  getCategories,
  generateFacts,
};
