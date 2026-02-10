## Mock Backend

Това е standalone Node/Express mock backend, който симулира реалния backend API за React Native приложение. Всички endpoints връщат JSON отговори и използват in-memory данни.

### Инсталация

```bash
cd mock-backend
npm install
```

### Стартиране

- **Development (с nodemon - автоматично рестартиране при промени)**:

```bash
npm run dev
```

- **Production / обикновен Node**:

```bash
npm start
```

Сървърът слуша на порт **3000** по подразбиране (или `process.env.PORT` ако е зададен).

### Swagger Документация

Пълна API документация е достъпна на:

```
http://localhost:3000/api/docs
```

### Основни Endpoints

#### Health Check

- **Method**: GET
- **URL**: `/health`
- **Response**:

```json
{
  "status": "ok",
  "env": "development"
}
```

### API Endpoints

Всички API endpoints са достъпни под `/api`:

#### Автентикация (`/api/auth/*`)
- `POST /api/auth/register` - Регистрация на нов потребител
- `POST /api/auth/login` - Вход в системата
- `GET /api/auth/me` - Получаване на информация за текущия потребител
- `POST /api/auth/reset-password` - Забравена парола

#### PIN (`/api/auth/pin/*`)
- `POST /api/auth/pin/verify` - Верификация на PIN код
- `POST /api/auth/pin/set` - Задаване на PIN код

#### Деца (`/api/children/*`)
- `GET /api/children` - Списък с децата на текущия потребител
- `POST /api/children` - Създаване на ново дете
- `GET /api/children/:id` - Детайли за конкретно дете
- `PUT /api/children/:id` - Актуализация на дете
- `DELETE /api/children/:id` - Изтриване на дете

#### Кодове (`/api/codes/*`)
- `GET /api/codes` - Списък с налични кодове
- `POST /api/codes/validate` - Валидация на код

#### Родителски контрол (`/api/parent/*`)
- `GET /api/parent/notifications` - Настройки за нотификации
- `PUT /api/parent/notifications` - Актуализация на настройки за нотификации
- `POST /api/parent/ai-conversations` - Създаване на разговор с AI
- `GET /api/parent/ai-conversations` - Списък с разговори с AI

#### Герои (`/api/heroes/*`)
- `GET /api/heroes` - Списък с герои за текущото дете
- `GET /api/heroes/:id` - Детайли за конкретен герой
- `POST /api/heroes` - Създаване на нов герой
- `PUT /api/heroes/:id` - Актуализация на герой
- `DELETE /api/heroes/:id` - Изтриване на герой
- `POST /api/heroes/validate-image` - Валидация на изображение за герой
- `POST /api/heroes/animate-image` - Анимиране на изображение
- `POST /api/heroes/:id/animate` - Генериране на видео за герой
- `POST /api/heroes/:id/set-best-friend` - Задаване на герой като най-добър приятел
- `DELETE /api/heroes/:id/unset-best-friend` - Премахване на герой като най-добър приятел
- `GET /api/heroes/best-friend` - Получаване на най-добрия приятел герой

#### Приказки (`/api/stories/*`)
- `GET /api/stories` - Списък с приказки за текущото дете (с пагинация и търсене)
- `GET /api/stories/:id` - Детайли за конкретна приказка
- `POST /api/stories` - Създаване на нова приказка
- `PUT /api/stories/:id` - Актуализация на приказка
- `DELETE /api/stories/:id` - Изтриване на приказка
- `POST /api/stories/validate-image` - Валидация на изображение за приказка
- `POST /api/stories/animate-image` - Анимиране на изображение
- `POST /api/stories/:id/animate` - Генериране на видео за приказка

### Автентикация

Повечето endpoints изискват автентикация чрез JWT token в header:

```
Authorization: Bearer <access_token>
```

Някои endpoints изискват и `X-Child-Id` header за да идентифицират за кое дете се отнася заявката.

### Примерни заявки

#### Регистрация

```bash
curl -X POST "http://localhost:3000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "fullName": "Test User"
  }'
```

#### Вход

```bash
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

#### Получаване на списък с герои

```bash
curl -X GET "http://localhost:3000/api/heroes" \
  -H "Authorization: Bearer <access_token>" \
  -H "X-Child-Id: 1"
```

### Използване от React Native

Насочете базовия URL на React Native приложението към:

```text
http://<local-machine-ip>:3000/
```

Например:
```text
http://192.168.1.100:3000/
```

### Зависимости

- `express` - Web framework
- `body-parser` - Парсване на request body
- `cors` - Cross-Origin Resource Sharing
- `swagger-ui-express` - Swagger UI интерфейс
- `swagger-jsdoc` - Swagger документация от JSDoc коментари
- `multer` - Обработка на multipart/form-data (file uploads)

### Структура на проекта

```
mock-backend/
├── server.js              # Главен сървър файл
├── swagger.js             # Swagger конфигурация
├── routes/                # API routes
│   ├── index.js          # Главен router
│   ├── auth.js           # Автентикация endpoints
│   ├── pin.js            # PIN endpoints
│   ├── children.js       # Деца endpoints
│   ├── codes.js          # Кодове endpoints
│   ├── parent.js         # Родителски контрол endpoints
│   ├── heroes.js         # Герои endpoints
│   └── stories.js        # Приказки endpoints
└── services/             # Business logic
    ├── authService.js
    ├── pinService.js
    ├── childrenService.js
    ├── codesService.js
    ├── parentService.js
    ├── heroesService.js
    └── storiesService.js
```

### База данни

Mock backend-ът използва in-memory данни (масиви в паметта). При рестартиране на сървъра всички данни се губят.

За реална схема на базата данни вижте:
- `database-schema.sql` - SQL DDL скрипт
- `DATABASE_SCHEMA.md` - Markdown документация на схемата

### Деплойване във Vercel

Проектът е конфигуриран за деплойване във Vercel.

#### Стъпки за деплойване:

1. **Инсталиране на Vercel CLI** (ако нямате):

```bash
npm i -g vercel
```

2. **Логин във Vercel**:

```bash
vercel login
```

3. **Деплойване**:

```bash
cd mock-backend
vercel
```

Следвайте инструкциите на CLI. При първо деплойване ще ви попита:
- Link to existing project? → `N` (за нов проект)
- Project name → въведете име (или натиснете Enter за default)
- Directory → натиснете Enter (използва текущата директория)

4. **Production деплойване**:

```bash
vercel --prod
```

#### Алтернативен метод (чрез GitHub):

1. Push-нете кода в GitHub repository
2. Отидете на [vercel.com](https://vercel.com)
3. Import проекта от GitHub
4. Root Directory: `mock-backend`
5. Build Command: (оставете празно или `npm install`)
6. Output Directory: (оставете празно)
7. Install Command: `npm install`
8. Натиснете Deploy

#### Конфигурация:

Проектът използва `vercel.json` за конфигурация. Сървърът автоматично работи и като serverless функция във Vercel, и локално.

#### Environment Variables:

Ако имате нужда от environment variables, добавете ги във Vercel Dashboard:
- Settings → Environment Variables

#### Важни бележки:

- Всички данни са in-memory и се губят при рестартиране на serverless функцията
- За production използвайте реална база данни
- CORS е конфигуриран да позволява всички origins (може да го ограничите за production)