// In-memory mock list of heroes
// Each hero belongs to a child_id
// Schema: id, child_id, name, image_url, mission, backstory, video_url, is_best_friend, created_at, updated_at
let heroes = [
  {
    id: 1,
    child_id: '1',
    name: 'Огнен дракон',
    image_url: 'https://picsum.photos/300/300',
    mission: 'Да пази кралството от злото и да защитава невинните.',
    backstory:
      'Роден в планините на изтока, този дракон е станал легенда сред хората. Той е спасил много градове от нашествия на врагове.',
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    is_best_friend: false,
    created_at: '2026-01-15T10:30:00Z',
    updated_at: null,
  },
  {
    id: 2,
    child_id: '1',
    name: 'Ледена принцеса',
    image_url: 'https://picsum.photos/300/310',
    mission: 'Да използва ледените си сили за защита на своето кралство.',
    backstory:
      'Принцесата е наследник на древна магическа династия. Нейните сили са се проявили още в ранна възраст.',
    created_at: '2026-01-20T14:22:00Z',
    updated_at: null,
  },
  {
    id: 3,
    child_id: '1',
    name: 'Космически рицар',
    image_url: 'https://picsum.photos/320/300',
    mission: 'Да пътува между звездите и да защитава галактиката от злото.',
    backstory:
      'Бивш войн от далечна планета, който е загубил своя свят, но продължава да защитава други.',
    created_at: '2026-01-18T09:15:00Z',
    updated_at: null,
  },
  {
    id: 4,
    child_id: '1',
    name: 'Вълшебно еднорог',
    image_url: 'https://picsum.photos/330/300',
    mission: 'Да лекува и защитава всички живи същества с магическата си сила.',
    backstory:
      'Създаден от чистата магия на природата, този еднорог е пазител на всички живи същества.',
    created_at: '2026-01-22T11:45:00Z',
    updated_at: null,
  },
  {
    id: 5,
    child_id: '1',
    name: 'Морска русалка',
    image_url: 'https://picsum.photos/340/300',
    mission: 'Да контролира океаните и да защитава морските същества.',
    backstory:
      'Дъщеря на морския крал, тя е наследник на древната сила на океана.',
    created_at: '2026-01-19T16:30:00Z',
    updated_at: null,
  },
  {
    id: 6,
    child_id: '1',
    name: 'Гръмотевичен титан',
    image_url: 'https://picsum.photos/300/350',
    mission: 'Да използва силата на мълнията за защита на справедливостта.',
    backstory:
      'Създаден от самите богове, този титан е пазител на справедливостта.',
    created_at: '2026-01-17T13:20:00Z',
    updated_at: null,
  },
  {
    id: 7,
    child_id: '1',
    name: 'Звездна магьосница',
    image_url: 'https://picsum.photos/300/360',
    mission: 'Да черпи сила от звездите и да предсказва бъдещето за защита на света.',
    backstory:
      'Ученичка на древна магическа школа, тя е овладела тайните на вселената.',
    created_at: '2026-01-21T08:00:00Z',
    updated_at: null,
  },
  {
    id: 8,
    child_id: '1',
    name: 'Златен феникс',
    image_url: 'https://picsum.photos/300/370',
    mission: 'Да възкръсва от пепелта си и да носи надежда навсякъде.',
    backstory:
      'Легендарна птица, която умира и се ражда отново, носейки надежда навсякъде.',
    created_at: '2026-01-16T15:10:00Z',
    updated_at: null,
  },
  {
    id: 9,
    child_id: '1',
    name: 'Нощен страж',
    image_url: 'https://picsum.photos/300/380',
    mission: 'Да защитава нощта и всички, които спят спокойно.',
    backstory:
      'Бивш убиец, който е намерил своята цел в защитата на невинните.',
    created_at: '2026-01-14T20:45:00Z',
    updated_at: null,
  },
  {
    id: 10,
    child_id: '1',
    name: 'Горски пазител',
    image_url: 'https://picsum.photos/300/390',
    mission: 'Да пази гората и всички нейни обитатели от унищожение.',
    backstory:
      'Древен дух на гората, който е живял хиляди години и знае всички тайни на природата.',
    created_at: '2026-01-13T12:00:00Z',
    updated_at: null,
  },
  {
    id: 11,
    child_id: '2',
    name: 'Въздушен херой',
    image_url: 'https://picsum.photos/400/400',
    mission: 'Да лети свободно в небето и да контролира вятъра за защита на градовете.',
    backstory:
      'Роден с крила, този херой е научил да използва силата на вятъра за добро.',
    created_at: '2026-01-23T10:15:00Z',
    updated_at: null,
  },
  {
    id: 12,
    child_id: '2',
    name: 'Каменен великан',
    image_url: 'https://picsum.photos/410/410',
    mission: 'Да пази планините и да е непобедим в битка срещу злото.',
    backstory:
      'Създаден от самата земя, този великан е пазител на планините.',
    created_at: '2026-01-24T14:30:00Z',
    updated_at: null,
  },
  {
    id: 13,
    child_id: '2',
    name: 'Светлинен ангел',
    image_url: 'https://picsum.photos/420/420',
    mission: 'Да носи светлина и надежда навсякъде и да защитава доброто.',
    backstory:
      'Изпратен от небесата, този ангел е тук да защитава доброто.',
    created_at: '2026-01-25T09:20:00Z',
    updated_at: null,
  },
  {
    id: 14,
    child_id: '2',
    name: 'Тъмен асасин',
    image_url: 'https://picsum.photos/430/430',
    mission: 'Да работи в сенките и да елиминира заплахите преди да станат опасни.',
    backstory:
      'Обучен в древно изкуство на убийството, този асасин избира своите цели внимателно.',
    created_at: '2026-01-26T11:50:00Z',
    updated_at: null,
  },
  {
    id: 15,
    child_id: '2',
    name: 'Водна нимфа',
    image_url: 'https://picsum.photos/440/440',
    mission: 'Да контролира реките и езерата и да пази всички водни източници.',
    backstory:
      'Родена от самата вода, тази нимфа е пазител на всички водни източници.',
    created_at: '2026-01-27T16:40:00Z',
    updated_at: null,
  },
  {
    id: 16,
    child_id: '1',
    name: 'Планински войн',
    image_url: 'https://picsum.photos/450/450',
    mission: 'Да е непобедим в битка и да защитава планините от нашествия.',
    backstory:
      'Възпитаван в суровите планини, този войн е научил да оцелява във всяка ситуация.',
    created_at: '2026-01-28T08:25:00Z',
    updated_at: null,
    is_best_friend: true,
  },
  {
    id: 17,
    child_id: '1',
    name: 'Пустинен скорпион',
    image_url: 'https://picsum.photos/460/460',
    mission: 'Да бъде господар на пясъците и да защитава пустинята.',
    backstory:
      'Еволюирал в суровата пустиня, този скорпион е станал господар на пясъците.',
    created_at: '2026-01-12T17:00:00Z',
    updated_at: null,
  },
  {
    id: 18,
    child_id: '1',
    name: 'Снежен йети',
    image_url: 'https://picsum.photos/470/470',
    mission: 'Да пази планините през зимата и да защитава от студените бури.',
    backstory:
      'Легендарно същество от планините, което е живяло хиляди години.',
    created_at: '2026-01-11T19:30:00Z',
    updated_at: null,
  },
  {
    id: 19,
    child_id: '2',
    name: 'Тропически страж',
    image_url: 'https://picsum.photos/480/480',
    mission: 'Да пази тропическите джунгли и всички екзотични животни.',
    backstory:
      'Древен дух на джунглата, който знае всички тайни на природата.',
    created_at: '2026-01-10T13:15:00Z',
    updated_at: null,
  },
  {
    id: 20,
    child_id: '2',
    name: 'Електрически маг',
    image_url: 'https://picsum.photos/490/490',
    mission: 'Да контролира електричеството и мълнията за защита на света.',
    backstory:
      'Ученик на древна магическа школа, който е овладеъл силата на електричеството.',
    created_at: '2026-01-09T15:45:00Z',
    updated_at: null,
  },
  {
    id: 21,
    child_id: '1',
    name: 'Призрачен ловец',
    image_url: 'https://picsum.photos/500/500',
    mission: 'Да защитава света от зли духове и призраци.',
    backstory:
      'Роден с дарба да вижда духовете, този ловец е посветил живота си на защитата на живите.',
    created_at: '2026-01-08T10:20:00Z',
    updated_at: null,
  },
  {
    id: 22,
    child_id: '1',
    name: 'Кристална фея',
    image_url: 'https://picsum.photos/510/510',
    mission: 'Да разпръсква светлина навсякъде и да пази красотата на света.',
    backstory:
      'Създадена от самите кристали, тази фея е пазител на красотата и светлината.',
    created_at: '2026-01-07T14:10:00Z',
    updated_at: null,
  },
  {
    id: 23,
    child_id: '2',
    name: 'Лавов демон',
    image_url: 'https://picsum.photos/520/520',
    mission: 'Да контролира вулканите и да пази огнената сила.',
    backstory:
      'Роден в сърцето на вулкан, този демон е пазител на огнената сила.',
    created_at: '2026-01-06T18:00:00Z',
    updated_at: null,
  },
  {
    id: 24,
    child_id: '2',
    name: 'Бурен рейнджър',
    image_url: 'https://picsum.photos/530/530',
    mission: 'Да пътува из дивите земи и да защитава природата.',
    backstory:
      'Възпитаван в дивите земи, този рейнджър е научил да живее в хармония с природата.',
    created_at: '2026-01-05T12:30:00Z',
    updated_at: null,
  },
  {
    id: 25,
    child_id: '1',
    name: 'Небесен пътник',
    image_url: 'https://picsum.photos/540/540',
    mission: 'Да пътува между облаците и да контролира времето за баланс в природата.',
    backstory:
      'Избран от самите богове, този пътник е пазител на баланса в природата.',
    created_at: '2026-01-04T16:50:00Z',
    updated_at: null,
  },
];

// Helper to get current child_id from request
function getCurrentChildId(req) {
  const childIdFromHeader = req.headers['x-child-id'];
  if (childIdFromHeader) {
    return String(childIdFromHeader);
  }
  // For mock, default to child_id '1' if no header
  return '1';
}

// Helper to find hero by ID
function findHeroById(id) {
  return heroes.find((h) => h.id === Number(id));
}

// Helper to check if hero belongs to child
function heroBelongsToChild(hero, childId) {
  return hero && hero.child_id === String(childId);
}

// Helper to validate image file
function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'Изображението е задължително.' };
  }

  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return { valid: false, error: 'Невалиден формат на изображението. Разрешени са само JPG и PNG.' };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Изображението надвишава максималния размер от 5MB.' };
  }

  return { valid: true };
}

// POST /api/heroes/validate-image
async function validateImage(req, res) {
  try {
    const childId = getCurrentChildId(req);

    // Check if child exists (mock validation)
    if (!childId) {
      return res.status(403).json({
        error: 'Няма достъп до детския профил.',
      });
    }

    // Get file from request (using multer or req.file)
    const file = req.file;

    // Validate file
    const fileValidation = validateImageFile(file);
    if (!fileValidation.valid) {
      return res.status(400).json({
        valid: false,
        message: fileValidation.error,
      });
    }

    // Mock AI validation - simulate validation result
    // In real implementation, this would call AI service (e.g., OpenAI GPT-4 Vision)
    // For mock, randomly return valid/invalid (90% valid for testing)
    const mockValid = true;

    if (mockValid) {
      setTimeout(() => {
        return res.status(200).json({
          valid: true,
        });
      }, 5000);
    } else {
      setTimeout(() => {
        return res.status(200).json({
          valid: false,
          message: 'Изображението съдържа неподходящо съдържание за деца.',
        });
      }, 5000);
    }
  } catch (err) {
    console.error('[MOCK] validateImage error', err);
    return res.status(500).json({
      error: 'Грешка при AI валидация (mock).',
    });
  }
}

// POST /api/heroes/animate-image
async function animateImage(req, res) {
  try {
    const childId = getCurrentChildId(req);

    // Check if child exists (mock validation)
    if (!childId) {
      return res.status(403).json({
        error: 'Няма достъп до детския профил.',
      });
    }

    // Get file from request
    const file = req.file;

    // Validate file
    const fileValidation = validateImageFile(file);
    if (!fileValidation.valid) {
      return res.status(400).json({
        error: fileValidation.error,
      });
    }

    // Mock AI animation - simulate generating animated image
    // In real implementation, this would call AI service (e.g., Stable Diffusion, DALL-E)
    // For mock, generate a random URL
    const timestamp = Date.now();
    const animatedImageUrl = `https://picsum.photos/333/333`;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setTimeout(() => {
      return res.status(200).json({
        animatedImageUrl: animatedImageUrl,
      });
    }, 5000);
  } catch (err) {
    console.error('[MOCK] animateImage error', err);
    return res.status(500).json({
      error: 'Грешка при AI анимиране (mock).',
    });
  }
}

// GET /api/heroes
async function listHeroes(req, res) {
  try {
    const childId = getCurrentChildId(req);
    const page = parseInt(req.query.page || '1', 10);
    const perPage = parseInt(req.query.per_page || '10', 10);
    const search = req.query.search || '';

    // Filter heroes by child_id
    let filteredHeroes = heroes.filter((h) => h.child_id === childId);

    // Apply search filter if provided (minimum 3 characters)
    if (search && search.length >= 3) {
      const searchLower = search.toLowerCase();
      filteredHeroes = filteredHeroes.filter((h) =>
        h.name.toLowerCase().includes(searchLower),
      );
    }

    // Sort by created_at DESC (newest first)
    filteredHeroes.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    // Pagination
    const totalCount = filteredHeroes.length;
    const totalPages = Math.ceil(totalCount / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedHeroes = filteredHeroes.slice(start, end);

    // Format response
    const formattedHeroes = paginatedHeroes.map((h) => ({
      id: h.id,
      name: h.name,
      image_url: h.image_url,
      mission: h.mission,
      backstory: h.backstory,
      created_at: h.created_at,
      video_url: h.video_url || null,
      is_best_friend: h.is_best_friend || false,
    }));

    return res.status(200).json({
      heroes: formattedHeroes,
      total_count: totalCount,
      current_page: page,
      total_pages: totalPages,
      per_page: perPage,
    });
  } catch (err) {
    console.error('[MOCK] listHeroes error', err);
    return res.status(500).json({
      error: 'Неуспешно зареждане на героите (mock).',
    });
  }
}

// GET /api/heroes/best-friend
async function getBestFriend(req, res) {
  try {
    const childId = getCurrentChildId(req);

    // Find best friend hero for this child
    const bestFriend = heroes.find(
      (h) => h.child_id === childId && (h.is_best_friend === true || h.is_best_friend === 'true')
    );

    if (!bestFriend) {
      return res.status(404).json({
        message: 'Няма зададен най-добър приятел.',
      });
    }

    // Ensure all fields exist (for backward compatibility)
    if (bestFriend.video_url === undefined) {
      bestFriend.video_url = null;
    }
    if (bestFriend.is_best_friend === undefined) {
      bestFriend.is_best_friend = false;
    }

    // Return best friend hero (include best-friend meta if set)
    return res.status(200).json({
      id: bestFriend.id,
      name: bestFriend.name,
      image_url: bestFriend.image_url,
      video_url: bestFriend.video_url || null,
      mission: bestFriend.mission || null,
      backstory: bestFriend.backstory || null,
      created_at: bestFriend.created_at,
      is_best_friend: true,
      display_name: bestFriend.best_friend_display_name || null,
      description: bestFriend.best_friend_description || null,
      voice_id: bestFriend.best_friend_voice_id || null,
    });
  } catch (err) {
    console.error('[MOCK] getBestFriend error', err);
    return res.status(500).json({
      message: 'Възникна грешка при обработката на заявката.',
    });
  }
}

// GET /api/heroes/:id
async function getHero(req, res) {
  try {
    const { id } = req.params;
    const childId = getCurrentChildId(req);

    const hero = findHeroById(id);

    if (!hero) {
      return res.status(404).json({
        error: 'Героят не е намерен (mock).',
      });
    }

    if (!heroBelongsToChild(hero, childId)) {
      return res.status(404).json({
        error: 'Героят не е намерен (mock).',
      });
    }

    // Ensure video_url and is_best_friend exist (for backward compatibility)
    if (hero.video_url === undefined) {
      hero.video_url = null;
    }
    if (hero.is_best_friend === undefined) {
      hero.is_best_friend = false;
    }

    // Return hero with all fields including mission, backstory, video_url, and is_best_friend
    return res.status(200).json({
      id: hero.id,
      name: hero.name,
      image_url: hero.image_url,
      mission: hero.mission || null,
      backstory: hero.backstory || null,
      video_url: hero.video_url || null,
      is_best_friend: hero.is_best_friend || false,
      created_at: hero.created_at,
      updated_at: hero.updated_at,
    });
  } catch (err) {
    console.error('[MOCK] getHero error', err);
    return res.status(500).json({
      error: 'Неуспешно зареждане на героя (mock).',
    });
  }
}

// POST /api/heroes
async function createHero(req, res) {
  try {
    const childId = getCurrentChildId(req);

    // Get data from body (multipart/form-data or JSON)
    const { name, mission, backstory, image_url } = req.body || {};
    const imageFile = req.file; // From multer

    // Validation: name is required
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(422).json({
        message: 'Полето "name" е задължително.',
        errors: {
          name: ['Полето "name" е задължително.'],
        },
      });
    }

    const trimmedName = name.trim();

    // Validation: name must be between 3 and 12 characters
    if (trimmedName.length < 3 || trimmedName.length > 12) {
      return res.status(422).json({
        message: 'Името трябва да е между 3 и 12 символа.',
        errors: {
          name: ['Името трябва да е между 3 и 12 символа.'],
        },
      });
    }

    // Validation: mission max 30 characters
    if (mission && typeof mission === 'string' && mission.length > 30) {
      return res.status(422).json({
        message: 'Мисията не може да надвишава 30 символа.',
        errors: {
          mission: ['Мисията не може да надвишава 30 символа.'],
        },
      });
    }

    // Validation: backstory max 250 characters
    if (backstory && typeof backstory === 'string' && backstory.length > 250) {
      return res.status(422).json({
        message: 'Историята не може да надвишава 250 символа.',
        errors: {
          backstory: ['Историята не може да надвишава 250 символа.'],
        },
      });
    }

    // Validation: image_url or image file must be provided
    let heroImageUrl = null;

    if (image_url) {
      // Validate URL format
      try {
        new URL(image_url);
        heroImageUrl = image_url;
      } catch (e) {
        return res.status(422).json({
          message: 'Невалиден формат на URL за изображение.',
          errors: {
            image_url: ['Невалиден формат на URL за изображение.'],
          },
        });
      }
    } else if (imageFile) {
      // Validate image file
      const fileValidation = validateImageFile(imageFile);
      if (!fileValidation.valid) {
        return res.status(422).json({
          message: fileValidation.error,
          errors: {
            image: [fileValidation.error],
          },
        });
      }
      // Generate URL for uploaded file (mock)
      heroImageUrl = `https://picsum.photos/333/333`;
    } else {
      return res.status(422).json({
        message: 'Трябва да се предостави image_url или image файл.',
        errors: {
          image: ['Трябва да се предостави image_url или image файл.'],
        },
      });
    }

    // Generate new ID
    const nextId =
      heroes.length > 0
        ? Math.max(...heroes.map((h) => h.id)) + 1
        : 1;

    const now = new Date().toISOString();

    // Create hero
    const newHero = {
      id: nextId,
      child_id: childId,
      name: trimmedName,
      image_url: heroImageUrl,
      mission: mission || null,
      backstory: backstory || null,
      video_url: null,
      is_best_friend: false,
      created_at: now,
      updated_at: now,
    };

    heroes.push(newHero);

    // Return response
    return res.status(201).json({
      id: newHero.id,
      name: newHero.name,
      mission: newHero.mission,
      backstory: newHero.backstory,
      image_url: newHero.image_url,
      is_best_friend: newHero.is_best_friend,
      created_at: newHero.created_at,
      updated_at: newHero.updated_at,
    });
  } catch (err) {
    console.error('[MOCK] createHero error', err);
    return res.status(500).json({
      error: 'Неуспешно създаване на герой (mock).',
    });
  }
}

// PUT /api/heroes/:id
async function updateHero(req, res) {
  try {
    const { id } = req.params;
    const childId = getCurrentChildId(req);
    const { name, mission, backstory, image_url } = req.body || {};

    const hero = findHeroById(id);

    if (!hero) {
      return res.status(404).json({
        error: 'Героят не е намерен (mock).',
      });
    }

    if (!heroBelongsToChild(hero, childId)) {
      return res.status(404).json({
        error: 'Героят не е намерен (mock).',
      });
    }

    // Validation for name if provided
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({
          message: 'Името не може да е празно.',
          errors: {
            name: ['Името не може да е празно.'],
          },
        });
      }

      const trimmedName = name.trim();

      if (trimmedName.length < 3 || trimmedName.length > 12) {
        return res.status(400).json({
          message: 'Името трябва да е между 3 и 12 символа.',
          errors: {
            name: ['Името трябва да е между 3 и 12 символа.'],
          },
        });
      }

      hero.name = trimmedName;
    }

    // Update mission if provided
    if (mission !== undefined) {
      if (typeof mission === 'string' && mission.trim().length === 0) {
        // Empty string means clear the field
        hero.mission = null;
      } else if (mission && typeof mission === 'string') {
        if (mission.length > 30) {
          return res.status(400).json({
            message: 'Мисията не може да надвишава 30 символа.',
            errors: {
              mission: ['Мисията не може да надвишава 30 символа.'],
            },
          });
        }
        hero.mission = mission.trim();
      } else if (mission === null) {
        hero.mission = null;
      }
    }

    // Update backstory if provided
    if (backstory !== undefined) {
      if (typeof backstory === 'string' && backstory.trim().length === 0) {
        // Empty string means clear the field
        hero.backstory = null;
      } else if (backstory && typeof backstory === 'string') {
        if (backstory.length > 250) {
          return res.status(400).json({
            message: 'Историята не може да надвишава 250 символа.',
            errors: {
              backstory: ['Историята не може да надвишава 250 символа.'],
            },
          });
        }
        hero.backstory = backstory.trim();
      } else if (backstory === null) {
        hero.backstory = null;
      }
    }

    // Update image_url if provided
    if (image_url !== undefined) {
      hero.image_url = image_url || `https://picsum.photos/333/333`;
    }

    // Ensure video_url and is_best_friend exist
    if (hero.video_url === undefined) {
      hero.video_url = null;
    }
    if (hero.is_best_friend === undefined) {
      hero.is_best_friend = false;
    }

    // Update updated_at
    hero.updated_at = new Date().toISOString();

    // Return updated hero
    return res.status(200).json({
      id: hero.id,
      name: hero.name,
      image_url: hero.image_url,
      mission: hero.mission || null,
      backstory: hero.backstory || null,
      video_url: hero.video_url || null,
      is_best_friend: hero.is_best_friend || false,
      created_at: hero.created_at,
      updated_at: hero.updated_at,
    });
  } catch (err) {
    console.error('[MOCK] updateHero error', err);
    return res.status(500).json({
      error: 'Неуспешно актуализиране на герой (mock).',
    });
  }
}

// POST /api/heroes/:id/animate
async function animateHero(req, res) {
  try {
    const { id } = req.params;
    const childId = getCurrentChildId(req);
    const { prompt } = req.body || {};

    // Validate prompt
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        message: "Полето 'prompt' е задължително.",
      });
    }

    const trimmedPrompt = prompt.trim();

    if (trimmedPrompt.length < 4 || trimmedPrompt.length > 500) {
      return res.status(400).json({
        message: 'Описът трябва да е между 4 и 500 символа.',
      });
    }

    const hero = findHeroById(id);

    if (!hero) {
      return res.status(404).json({
        message: 'Героят не е намерен.',
      });
    }

    if (!heroBelongsToChild(hero, childId)) {
      return res.status(403).json({
        message: 'Нямате достъп до този герой.',
      });
    }

    // Check if hero has an image
    if (!hero.image_url) {
      return res.status(400).json({
        message: 'Героят няма изображение за анимиране.',
      });
    }

    // Combine user prompt with hero data for AI generation
    const combinedPrompt = `
Герой: ${hero.name}
${hero.mission ? `Мисия: ${hero.mission}` : ''}
${hero.backstory ? `История: ${hero.backstory}` : ''}

Потребителска инструкция: ${trimmedPrompt}

Генерирай 2D анимация на героя според потребителската инструкция.
`.trim();

    // Mock: Simulate AI video generation
    // In real implementation, this would:
    // 1. Download the image from image_url
    // 2. Send combined prompt to AI service (e.g., RunwayML Gen-2, Stable Video Diffusion)
    // 3. Wait for video generation (10-30 seconds)
    // 4. Save video to storage (S3, local storage, etc.)
    // 5. Get video URL

    // Simulate processing delay (30 seconds for mock)
    await new Promise((resolve) => setTimeout(resolve, 30000));

    // Generate mock video URL
    const timestamp = Date.now();
    const videoUrl = `https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;

    // Update hero's video_url
    hero.video_url = videoUrl;
    hero.updated_at = new Date().toISOString();

    setTimeout(() => {
      return res.status(200).json({
        video_url: videoUrl,
        message: 'Анимацията се генерира успешно',
      });
    }, 5000);
  } catch (err) {
    console.error('[MOCK] animateHero error', err);
    return res.status(500).json({
      message: 'Възникна грешка при генерирането на анимацията.',
    });
  }
}

// Optional body: display_name (string), description (string, max 500), voice_id (string from voice-previews)
// Saves these fields on the hero when set as best friend.
function applyBestFriendMeta(hero, body) {
  if (!body) return;
  if (body.display_name !== undefined && body.display_name !== null) {
    hero.best_friend_display_name =
      typeof body.display_name === 'string' && body.display_name.trim().length > 0
        ? body.display_name.trim()
        : null;
  }
  if (body.description !== undefined && body.description !== null) {
    const desc = typeof body.description === 'string' ? body.description.trim() : '';
    hero.best_friend_description = desc.length > 0 ? (desc.length <= 500 ? desc : desc.slice(0, 500)) : null;
  }
  if (body.voice_id !== undefined && body.voice_id !== null) {
    hero.best_friend_voice_id =
      typeof body.voice_id === 'string' && body.voice_id.trim().length > 0
        ? body.voice_id.trim()
        : null;
  }
}

function formatBestFriendHero(hero) {
  return {
    id: hero.id,
    name: hero.name,
    image_url: hero.image_url,
    video_url: hero.video_url || null,
    mission: hero.mission || null,
    backstory: hero.backstory || null,
    created_at: hero.created_at,
    is_best_friend: true,
    display_name: hero.best_friend_display_name || null,
    description: hero.best_friend_description || null,
    voice_id: hero.best_friend_voice_id || null,
  };
}

// POST /api/heroes/:id/set-best-friend
async function setBestFriend(req, res) {
  try {
    const { id } = req.params;
    const childId = getCurrentChildId(req);
    const body = req.body || {};

    const hero = findHeroById(id);

    if (!hero) {
      return res.status(404).json({
        message: 'Героят не е намерен.',
      });
    }

    if (!heroBelongsToChild(hero, childId)) {
      return res.status(403).json({
        message: 'Нямате право да променяте този герой.',
      });
    }

    // Validate description max 500 chars if provided
    if (body.description !== undefined && body.description !== null && typeof body.description === 'string') {
      if (body.description.length > 500) {
        return res.status(422).json({
          message: 'Описанието не може да надвишава 500 символа.',
          errors: { description: ['Описанието не може да надвишава 500 символа.'] },
        });
      }
    }

    // Only one best friend per child: remove status from all other heroes, then set this one and save body fields.
    if (hero.is_best_friend === true) {
      // Already best friend: just update meta (display_name, description, voice_id) and return
      applyBestFriendMeta(hero, body);
      hero.updated_at = new Date().toISOString();
      return res.status(200).json({
        message: 'Hero успешно направен най-добър приятел',
        hero: formatBestFriendHero(hero),
      });
    }

    // Remove best friend status from all other heroes of this child (single active best friend)
    heroes.forEach((h) => {
      if (h.child_id === childId && h.is_best_friend === true) {
        h.is_best_friend = false;
      }
    });

    // Apply and save body fields (display_name, description, voice_id), then mark as best friend
    applyBestFriendMeta(hero, body);
    hero.is_best_friend = true;
    hero.updated_at = new Date().toISOString();

    return res.status(200).json({
      message: 'Hero успешно направен най-добър приятел',
      hero: formatBestFriendHero(hero),
    });
  } catch (err) {
    console.error('[MOCK] setBestFriend error', err);
    return res.status(500).json({
      message: 'Възникна грешка при обработката на заявката.',
    });
  }
}

// GET /api/heroes/voice-previews – list of test voices (id, title, url; also label, audio_url)
const VOICE_PREVIEWS = [
  { id: 'voice-male-1', title: 'Мъжки глас 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'voice-male-2', title: 'Мъжки глас 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'voice-female-1', title: 'Дамски глас 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'voice-female-2', title: 'Дамски глас 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 'voice-child-1', title: 'Детски глас 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];

async function getVoicePreviews(req, res) {
  try {
    const list = VOICE_PREVIEWS.map((v) => ({
      id: v.id,
      title: v.title,
      url: v.url,
      label: v.title,
      audio_url: v.url,
    }));
    return res.status(200).json(list);
  } catch (err) {
    console.error('[MOCK] getVoicePreviews error', err);
    return res.status(500).json({
      error: 'Неуспешно зареждане на гласовете (mock).',
    });
  }
}

// GET /api/heroes/best-friend/greeting-audio – greeting audio URL for current best friend
const GREETING_AUDIO_TEMPLATE = (name, description) =>
  `Здравей! Аз съм ${name}. ${description || 'Радвам се да те запозная!'}`;

async function getGreetingAudio(req, res) {
  try {
    const childId = getCurrentChildId(req);

    const bestFriend = heroes.find(
      (h) => h.child_id === childId && (h.is_best_friend === true || h.is_best_friend === 'true')
    );

    if (!bestFriend) {
      return res.status(404).json({
        message: 'Няма зададен най-добър приятел.',
      });
    }

    const displayName = bestFriend.best_friend_display_name || bestFriend.name;
    const description = bestFriend.best_friend_description || bestFriend.backstory || bestFriend.mission || '';
    const greetingText = GREETING_AUDIO_TEMPLATE(displayName, description);

    // Mock: backend "generates" greeting audio – return a public URL to sample audio
    // In real implementation: TTS with selected voice_id, upload to storage, return URL
    const mockAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

    return res.status(200).json({
      url: mockAudioUrl,
      audio_url: mockAudioUrl,
    });
  } catch (err) {
    console.error('[MOCK] getGreetingAudio error', err);
    return res.status(500).json({
      error: 'Грешка при генериране на поздравителното аудио (mock).',
    });
  }
}

// POST /api/heroes/:id/unset-best-friend
async function unsetBestFriend(req, res) {
  try {
    const { id } = req.params;
    const childId = getCurrentChildId(req);

    const hero = findHeroById(id);

    if (!hero) {
      return res.status(404).json({
        message: 'Героят не е намерен.',
      });
    }

    if (!heroBelongsToChild(hero, childId)) {
      return res.status(403).json({
        message: 'Нямате право да променяте този герой.',
      });
    }

    // Check if hero is already not best friend (idempotent operation)
    if (hero.is_best_friend === false || hero.is_best_friend === undefined) {
      // Return success even if already unset (idempotent)
      return res.status(200).json({
        message: "Статусът 'най-добър приятел' е премахнат успешно",
        hero: {
          id: hero.id,
          name: hero.name,
          image_url: hero.image_url,
          video_url: hero.video_url || null,
          mission: hero.mission || null,
          backstory: hero.backstory || null,
          created_at: hero.created_at,
          is_best_friend: false,
        },
      });
    }

    // Remove best friend status
    hero.is_best_friend = false;
    hero.updated_at = new Date().toISOString();

    // Return success response
    return res.status(200).json({
      message: "Статусът 'най-добър приятел' е премахнат успешно",
      hero: {
        id: hero.id,
        name: hero.name,
        image_url: hero.image_url,
        video_url: hero.video_url || null,
        mission: hero.mission || null,
        backstory: hero.backstory || null,
        created_at: hero.created_at,
        is_best_friend: false,
      },
    });
  } catch (err) {
    console.error('[MOCK] unsetBestFriend error', err);
    return res.status(500).json({
      message: 'Възникна грешка при обработката на заявката.',
    });
  }
}

// DELETE /api/heroes/:id
async function deleteHero(req, res) {
  try {
    const { id } = req.params;
    const childId = getCurrentChildId(req);

    const hero = findHeroById(id);

    if (!hero) {
      return res.status(404).json({
        error: 'Героят не е намерен (mock).',
      });
    }

    if (!heroBelongsToChild(hero, childId)) {
      return res.status(404).json({
        error: 'Героят не е намерен (mock).',
      });
    }

    // Remove hero from array
    const index = heroes.findIndex((h) => h.id === Number(id));
    if (index !== -1) {
      heroes.splice(index, 1);
    }

    return res.status(204).send();
  } catch (err) {
    console.error('[MOCK] deleteHero error', err);
    return res.status(500).json({
      error: 'Неуспешно изтриване на герой (mock).',
    });
  }
}

module.exports = {
  listHeroes,
  getHero,
  getBestFriend,
  createHero,
  updateHero,
  deleteHero,
  validateImage,
  animateImage,
  animateHero,
  setBestFriend,
  unsetBestFriend,
  getVoicePreviews,
  getGreetingAudio,
};
