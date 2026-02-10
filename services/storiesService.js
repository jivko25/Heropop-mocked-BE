// In-memory mock list of stories
// Each story belongs to a child_id
// Schema: id, child_id, title, theme, content, image_url, video_url, created_at, updated_at
let stories = [
  {
    id: 1,
    child_id: '1',
    title: 'Приказка за храбрия рицар',
    theme: 'Приключения на храбър рицар',
    content: 'Имало едно време един храбър рицар, който защитаваше кралството от злото. Той пътуваше из далечни земи и спасяваше хората от опасности.',
    image_url: 'https://picsum.photos/400/300',
    video_url: null,
    created_at: '2026-01-15T10:30:00Z',
    updated_at: null,
  },
  {
    id: 2,
    child_id: '1',
    title: 'Приключенията на малкия дракон',
    theme: 'Малък дракон учи да лети',
    content: 'В една далечна пещера живееше малък дракон, който искаше да стане велик. Всеки ден той се упражняваше да лети и да издиша огън.',
    image_url: 'https://picsum.photos/400/301',
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    created_at: '2026-01-16T14:20:00Z',
    updated_at: null,
  },
  {
    id: 3,
    child_id: '1',
    title: 'Вълшебната гора',
    theme: 'Магическа гора с животни',
    content: 'В сърцето на гората имаше магическа поляна, където всички животни живееха в мир. Там се случваха най-невероятните приключения.',
    image_url: 'https://picsum.photos/400/302',
    video_url: null,
    created_at: '2026-01-17T09:15:00Z',
    updated_at: null,
  },
  {
    id: 4,
    child_id: '2',
    title: 'Принцесата и еднорогът',
    theme: 'Принцеса среща еднорог',
    content: 'Една добра принцеса срещна вълшебен еднорог в гората. Заедно те откриха тайни пътеки и магически места.',
    image_url: 'https://picsum.photos/400/303',
    video_url: null,
    created_at: '2026-01-18T11:00:00Z',
    updated_at: null,
  },
  {
    id: 5,
    child_id: '2',
    title: 'Космическото приключение',
    theme: 'Космическо пътешествие',
    content: 'Двама приятели откриха космически кораб и отлетяха към звездите. Те посетиха различни планети и срещнаха извънземни същества.',
    image_url: 'https://picsum.photos/400/304',
    video_url: null,
    created_at: '2026-01-19T16:45:00Z',
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

// Helper to find story by ID
function findStoryById(id) {
  return stories.find((s) => s.id === Number(id));
}

// Helper to check if story belongs to child
function storyBelongsToChild(story, childId) {
  return story && story.child_id === String(childId);
}

// Helper to validate image file
function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'Изображението е задължително.' };
  }

  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return {
      valid: false,
      error: 'Невалиден формат на изображението. Разрешени са само JPG и PNG.',
    };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Изображението надвишава максималния размер от 5MB.',
    };
  }

  return { valid: true };
}

// GET /api/stories
async function listStories(req, res) {
  try {
    const childId = getCurrentChildId(req);
    const page = parseInt(req.query.page || '1', 10);
    const perPage = parseInt(req.query.per_page || '10', 10);
    const search = req.query.search || '';

    // Filter stories by child_id
    let filteredStories = stories.filter((s) => s.child_id === childId);

    // Apply search filter if provided (minimum 3 characters)
    if (search && search.length >= 3) {
      const searchLower = search.toLowerCase();
      filteredStories = filteredStories.filter((s) =>
        s.title.toLowerCase().includes(searchLower),
      );
    }

    // Sort by created_at DESC (newest first)
    filteredStories.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    // Pagination
    const totalCount = filteredStories.length;
    const totalPages = Math.ceil(totalCount / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedStories = filteredStories.slice(start, end);

    // Format response (without content for list view)
    const formattedStories = paginatedStories.map((s) => ({
      id: s.id,
      title: s.title,
      image_url: s.image_url,
      created_at: s.created_at,
    }));

    return res.status(200).json({
      stories: formattedStories,
      total_count: totalCount,
      current_page: page,
      total_pages: totalPages,
    });
  } catch (err) {
    console.error('[MOCK] listStories error', err);
    return res.status(500).json({
      message: 'Възникна грешка при обработката на заявката.',
    });
  }
}

// GET /api/stories/:id
async function getStory(req, res) {
  try {
    const { id } = req.params;
    const childId = getCurrentChildId(req);

    const story = findStoryById(id);

    if (!story) {
      return res.status(404).json({
        message: 'Приказката не е намерена.',
      });
    }

    if (!storyBelongsToChild(story, childId)) {
      return res.status(403).json({
        message: 'Нямате право да виждате тази приказка.',
      });
    }

    // Ensure video_url exists (for backward compatibility)
    if (story.video_url === undefined) {
      story.video_url = null;
    }
    if (story.content === undefined) {
      story.content = null;
    }

    // Return story with all fields
    return res.status(200).json({
      id: story.id,
      title: story.title,
      image_url: story.image_url,
      content: story.content || null,
      created_at: story.created_at,
    });
  } catch (err) {
    console.error('[MOCK] getStory error', err);
    return res.status(500).json({
      message: 'Възникна грешка при обработката на заявката.',
    });
  }
}

// POST /api/stories
async function createStory(req, res) {
  try {
    const childId = getCurrentChildId(req);

    // Get data from body (multipart/form-data or JSON)
    const { title, theme, image_url } = req.body || {};
    const imageFile = req.file; // From multer

    // Validation: title is required
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        message: 'Заглавието е задължително.',
      });
    }

    const trimmedTitle = title.trim();

    // Validation: title must be between 1 and 200 characters
    if (trimmedTitle.length < 1 || trimmedTitle.length > 200) {
      return res.status(400).json({
        message: 'Заглавието трябва да е между 1 и 200 символа.',
      });
    }

    // Validation: theme is required
    if (!theme || typeof theme !== 'string' || theme.trim().length < 3) {
      return res.status(400).json({
        message: 'Темата е задължителна и трябва да е поне 3 символа.',
      });
    }

    const trimmedTheme = theme.trim();

    // Validation: theme must be between 3 and 100 characters
    if (trimmedTheme.length < 3 || trimmedTheme.length > 100) {
      return res.status(400).json({
        message: 'Темата трябва да е между 3 и 100 символа.',
      });
    }

    // Validation: must have image or image_url
    let storyImageUrl = null;

    if (image_url) {
      // Validate URL format
      try {
        new URL(image_url);
        storyImageUrl = image_url;
      } catch (e) {
        return res.status(400).json({
          message: 'Невалиден формат на URL за изображение.',
        });
      }
    } else if (imageFile) {
      // Validate image file
      const fileValidation = validateImageFile(imageFile);
      if (!fileValidation.valid) {
        return res.status(400).json({
          message: fileValidation.error,
        });
      }
      // Generate URL for uploaded file (mock)
      storyImageUrl = `https://picsum.photos/400/300`;
    } else {
      return res.status(400).json({
        message: 'Трябва да има поне снимка или image_url.',
      });
    }

    // Generate new ID
    const nextId =
      stories.length > 0
        ? Math.max(...stories.map((s) => s.id)) + 1
        : 1;

    const now = new Date().toISOString();

    // Generate content based on theme (mock AI generation)
    const generatedContent = `Приказка на тема: ${trimmedTheme}. Имало едно време... Това е генерирано съдържание на базата на темата "${trimmedTheme}".`;

    // Create story
    const newStory = {
      id: nextId,
      child_id: childId,
      title: trimmedTitle,
      theme: trimmedTheme,
      content: generatedContent,
      image_url: storyImageUrl,
      video_url: null,
      created_at: now,
      updated_at: null,
    };

    stories.push(newStory);

    // Return response
    return res.status(201).json({
      id: newStory.id,
      title: newStory.title,
      image_url: newStory.image_url,
      content: newStory.content,
      created_at: newStory.created_at,
    });
  } catch (err) {
    console.error('[MOCK] createStory error', err);
    return res.status(500).json({
      message: 'Възникна грешка при създаването на приказката.',
    });
  }
}

// PUT /api/stories/:id
async function updateStory(req, res) {
  try {
    const { id } = req.params;
    const childId = getCurrentChildId(req);
    const { title, content } = req.body || {};
    const imageFile = req.file; // From multer

    const story = findStoryById(id);

    if (!story) {
      return res.status(404).json({
        message: 'Приказката не е намерена.',
      });
    }

    if (!storyBelongsToChild(story, childId)) {
      return res.status(403).json({
        message: 'Нямате право да променяте тази приказка.',
      });
    }

    // Validation for title if provided
    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({
          message: 'Заглавието не може да бъде празно.',
        });
      }

      const trimmedTitle = title.trim();

      if (trimmedTitle.length < 1 || trimmedTitle.length > 200) {
        return res.status(400).json({
          message: 'Заглавието трябва да е между 1 и 200 символа.',
        });
      }

      story.title = trimmedTitle;
    }

    // Update content if provided
    if (content !== undefined) {
      story.content = content || null;
    }

    // Update image if provided
    if (imageFile) {
      const fileValidation = validateImageFile(imageFile);
      if (!fileValidation.valid) {
        return res.status(400).json({
          message: fileValidation.error,
        });
      }
      // Generate URL for uploaded file (mock)
      story.image_url = `https://picsum.photos/400/300`;
    }

    // Ensure video_url and content exist (for backward compatibility)
    if (story.video_url === undefined) {
      story.video_url = null;
    }
    if (story.content === undefined) {
      story.content = null;
    }

    // Update updated_at
    story.updated_at = new Date().toISOString();

    // Return updated story
    return res.status(200).json({
      id: story.id,
      title: story.title,
      image_url: story.image_url,
      content: story.content || null,
      created_at: story.created_at,
    });
  } catch (err) {
    console.error('[MOCK] updateStory error', err);
    return res.status(500).json({
      message: 'Възникна грешка при обработката на заявката.',
    });
  }
}

// POST /api/stories/:id/animate
async function animateStory(req, res) {
  try {
    const { id } = req.params;
    const childId = getCurrentChildId(req);

    const story = findStoryById(id);

    if (!story) {
      return res.status(404).json({
        message: 'Приказката не е намерена.',
      });
    }

    if (!storyBelongsToChild(story, childId)) {
      return res.status(403).json({
        message: 'Нямате право да променяте тази приказка.',
      });
    }

    if (!story.image_url) {
      return res.status(400).json({
        message: 'Приказката няма изображение за анимиране.',
      });
    }

    // Combine story data for AI animation
    const combinedPrompt = `
      Приказка: ${story.title}
      Изображение: ${story.image_url}

      Генерирай 2D анимация на изображението от приказката.
    `;

    console.log('[MOCK] AI Animation Prompt:', combinedPrompt);

    // Simulate AI processing delay (30 seconds for mock)
    await new Promise((resolve) => setTimeout(resolve, 30000));

    // Generate mock video URL
    const videoUrl = `https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;

    // Update story's video_url in the mock data array
    story.video_url = videoUrl;
    story.updated_at = new Date().toISOString();

    console.log('[MOCK] Story video_url updated:', {
      storyId: story.id,
      video_url: story.video_url,
      updated_at: story.updated_at,
    });

    // Verify the update was applied to the stories array
    const updatedStory = findStoryById(id);
    console.log('[MOCK] Verified story in array:', {
      storyId: updatedStory?.id,
      video_url: updatedStory?.video_url,
    });

    return res.status(200).json({
      video_url: videoUrl,
      message: 'Видеото се генерира успешно',
      story: {
        id: story.id,
        title: story.title,
        image_url: story.image_url,
        video_url: story.video_url,
        created_at: story.created_at,
      },
    });
  } catch (err) {
    console.error('[MOCK] animateStory error', err);
    return res.status(500).json({
      message: 'Възникна грешка при генерирането на видеото.',
    });
  }
}

// POST /api/stories/validate-image
async function validateImage(req, res) {
  try {
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        valid: false,
        message: 'Изображението е задължително.',
      });
    }

    // Validate image file
    const fileValidation = validateImageFile(imageFile);
    if (!fileValidation.valid) {
      return res.status(400).json({
        valid: false,
        message: fileValidation.error,
      });
    }

    // Mock AI validation - simulate delay (5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // For mock, always return valid: true
    return res.status(200).json({
      valid: true,
    });
  } catch (err) {
    console.error('[MOCK] validateImage error', err);
    return res.status(500).json({
      valid: false,
      message: 'Възникна грешка при валидацията на изображението.',
    });
  }
}

// POST /api/stories/animate-image
async function animateImage(req, res) {
  try {
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        message: 'Изображението е задължително.',
      });
    }

    // Validate image file
    const fileValidation = validateImageFile(imageFile);
    if (!fileValidation.valid) {
      return res.status(400).json({
        message: fileValidation.error,
      });
    }

    // Mock AI animation - simulate delay (5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Generate mock animated image URL
    const animatedImageUrl = `https://picsum.photos/400/300?random=${Date.now()}`;

    return res.status(200).json({
      animatedImageUrl: animatedImageUrl,
    });
  } catch (err) {
    console.error('[MOCK] animateImage error', err);
    return res.status(500).json({
      message: 'Възникна грешка при анимирането на изображението.',
    });
  }
}

// DELETE /api/stories/:id
async function deleteStory(req, res) {
  try {
    const { id } = req.params;
    const childId = getCurrentChildId(req);

    const story = findStoryById(id);

    if (!story) {
      return res.status(404).json({
        message: 'Приказката не е намерена.',
      });
    }

    if (!storyBelongsToChild(story, childId)) {
      return res.status(403).json({
        message: 'Нямате право да изтривате тази приказка.',
      });
    }

    // Remove story from array
    const index = stories.findIndex((s) => s.id === Number(id));
    if (index !== -1) {
      stories.splice(index, 1);
    }

    return res.status(200).json({
      message: 'Приказката е изтрита успешно.',
    });
  } catch (err) {
    console.error('[MOCK] deleteStory error', err);
    return res.status(500).json({
      message: 'Възникна грешка при обработката на заявката.',
    });
  }
}

module.exports = {
  listStories,
  getStory,
  createStory,
  updateStory,
  deleteStory,
  animateStory,
  validateImage,
  animateImage,
};
