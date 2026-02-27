// GET /api/learning/categories – list of subjects (learning categories)
// POST /api/learning/ask – ask question by category_id (mock: AI answer as text)

function getCurrentChildId(req) {
  const childIdFromHeader = req.headers['x-child-id'];
  if (childIdFromHeader) return String(childIdFromHeader);
  return '1';
}

const LEARNING_CATEGORIES = [
  { id: 1, text: 'История', color: '#8B5CF6', emoji: '📜' },
  { id: 2, text: 'Природознание', color: '#10B981', emoji: '🌿' },
  { id: 3, text: 'Наука', color: '#3B82F6', emoji: '🔬' },
  { id: 4, text: 'Езици', color: '#F59E0B', emoji: '🗣️' },
  { id: 5, text: 'Математика', color: '#EC4899', emoji: '🔢' },
  { id: 6, text: 'География', color: '#6366F1', emoji: '🌍' },
];

const MAX_QUESTION_LENGTH = 300;

async function getCategories(req, res) {
  try {
    return res.status(200).json({
      categories: LEARNING_CATEGORIES.map((c) => ({
        id: c.id,
        text: c.text,
        color: c.color,
        emoji: c.emoji,
      })),
    });
  } catch (err) {
    console.error('[MOCK] getLearningCategories error', err);
    return res.status(500).json({
      error: 'Неуспешно зареждане на категориите за учение (mock).',
    });
  }
}

async function ask(req, res) {
  try {
    getCurrentChildId(req);
    const { category_id: categoryId, question } = req.body || {};

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

    const category = LEARNING_CATEGORIES.find((c) => c.id === id);
    if (!category) {
      return res.status(400).json({
        error: 'Невалидна категория.',
      });
    }

    const q = typeof question === 'string' ? question.trim() : '';
    if (!q) {
      return res.status(400).json({
        error: 'Полето question е задължително.',
      });
    }
    if (q.length > MAX_QUESTION_LENGTH) {
      return res.status(400).json({
        error: `Въпросът не може да надвишава ${MAX_QUESTION_LENGTH} символа.`,
      });
    }

    // Mock: backend would build prompt with question, category, rules (child-safe, length), call AI, return answer
    const mockAnswersByCategory = {
      1: 'В историята изучаваме миналото на хората и обществата. Твоят въпрос е много интересен! За да отговоря по-добре, учителите използват книги, документи и археологически находки. Питай и в училище – там ще ти разкажат още.',
      2: 'Природознанието ни учи за природата – растения, животни, води и климат. Всичко около нас е свързано. Можеш да наблюдаваш природата в парка или в двора и да задаваш въпроси на родителите или учителите.',
      3: 'Науката ни помага да разберем как работи светът – от малките частици до звездите. Експериментите и наблюденията са важна част от науката. Продължавай да задаваш въпроси!',
      4: 'Езиците ни помагат да общуваме и да разбираме други хора и култури. Четенето и писането са ключови за всеки език. Практикувай с приятели и семейство.',
      5: 'Математиката е наука за числа, форми и логика. С нея решаваме задачи всеки ден. Упражнявай се с интересни задачи и питай учителя си при нужда.',
      6: 'Географията изучава Земята – страни, планини, реки и океани. Картите ни помагат да ориентираме. Разгледай глобус или карта и открий нови места!',
    };

    const answer =
      mockAnswersByCategory[id] ||
      `По тема „${category.text}" има много интересни неща за учене. Твоят въпрос е важен – питай учителя си или потърси в книга за повече информация.`;

    setTimeout(() => {
      return res.status(200).json({
        answer,
      });
    }, 3000);
  } catch (err) {
    console.error('[MOCK] learningAsk error', err);
    return res.status(500).json({
      error: 'Грешка при обработка на въпроса (mock).',
    });
  }
}

module.exports = {
  getCategories,
  ask,
};
