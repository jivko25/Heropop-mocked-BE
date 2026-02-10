# HeroPop Mobile App - Database Schema Documentation

## Общ преглед

Тази документация описва цялостната структура на базата данни за HeroPop мобилното приложение, извлечена от всички мокнати данни в `services/` директорията.

## Таблици

### 1. `users` - Потребители (Родители)
**Описание:** Основна таблица за потребителите (родителите), които управляват детските профили.

**Ключови полета:**
- `id` - Уникален идентификатор
- `email` - Email адрес (уникален)
- `password_hash` - Хеширана парола
- `full_name` - Пълно име
- `has_pin` - Дали потребителят има зададен PIN
- `pin_hash` - Хеш на PIN кода
- `pin_status` - Статус на PIN ('missing', 'set', 'reset_required')
- `is_parent` - Дали потребителят е родител

**Връзки:**
- Има много `children` (едно към много)
- Има много `codes` (едно към много)
- Има много `user_sessions` (едно към много)
- Има един `parent_notification_settings` (едно към едно)

---

### 2. `user_sessions` - Сесии на потребителите
**Описание:** Съхранява JWT токените за автентификация.

**Ключови полета:**
- `user_id` - Референция към `users.id`
- `access_token` - Access token
- `refresh_token` - Refresh token
- `expires_at` - Кога изтича токенът

**Връзки:**
- Принадлежи на един `user` (много към едно)

---

### 3. `push_tokens` - Push Notification Tokens
**Описание:** Съхранява push notification tokens за устройствата.

**Ключови полета:**
- `user_id` - Референция към `users.id`
- `token` - Push token
- `device_type` - Тип устройство ('ios', 'android')
- `device_id` - Уникален идентификатор на устройството

**Връзки:**
- Принадлежи на един `user` (много към едно)

---

### 4. `codes` - Кодове за активиране
**Описание:** Кодове, които родителите активират и асоциират с детски профили.

**Ключови полета:**
- `id` - Уникален идентификатор
- `user_id` - Собственик на кода (родител)
- `code` - Самият код (уникален)
- `status` - Статус ('active', 'inactive', 'expired')
- `activated_at` - Кога е активиран
- `expires_at` - Кога изтича
- `assigned_child_id` - Асоциирано дете (nullable)

**Връзки:**
- Принадлежи на един `user` (много към едно)
- Може да е асоцииран с един `child` (много към едно, nullable)

**Бизнес логика:**
- Кодът може да бъде 'inactive' (добавен, но не активиран)
- Кодът става 'active' при активиране
- Кодът става 'expired' след `expires_at`
- Един код може да бъде асоцииран с максимум едно дете

---

### 5. `children` - Детски профили
**Описание:** Профили на децата, управлявани от родителите.

**Ключови полета:**
- `id` - Уникален идентификатор
- `user_id` - Родител собственик
- `name` - Име на детето
- `avatar_url` - URL към аватар
- `avatar_key` - Ключ на аватар ('bear', 'unicorn', 'robot', 'cat', etc.)
- `is_active` - Дали профилът е активен
- `age` - Възраст
- `interests` - Интереси (текст)
- `ai_restrictions` - Ограничения за AI (текст)
- `code_id` - Асоцииран код
- `last_login_at` - Последно влизане
- `last_ai_diary_at` - Последна AI сесия

**Връзки:**
- Принадлежи на един `user` (много към едно)
- Може да има един `code` (много към едно, nullable)
- Има много `heroes` (едно към много)
- Има много `ai_sessions` (едно към много)

**Бизнес логика:**
- Всяко дете може да има максимум един асоцииран код
- При промяна на `code_id`, старият код се освобождава, новият се асоциира

---

### 6. `heroes` - Герои (Рисунки)
**Описание:** Герои (рисунки), създадени от децата.

**Ключови полета:**
- `id` - Уникален идентификатор
- `child_id` - Дете собственик
- `name` - Име на героя (3-12 символа)
- `image_url` - URL към изображението
- `mission` - Мисия на героя (максимум 30 символа)
- `backstory` - История на героя (максимум 250 символа)
- `video_url` - URL към анимирано видео (nullable)
- `is_best_friend` - Дали героят е най-добър приятел (boolean, default: false)

**Връзки:**
- Принадлежи на един `child` (много към едно)

**Валидации:**
- `name`: 3-12 символа
- `mission`: максимум 30 символа
- `backstory`: максимум 250 символа

**Бизнес логика:**
- Всяко дете може да има максимум един герой като най-добър приятел
- При задаване на нов най-добър приятел, старият автоматично губи статуса

---

### 7. `stories` - Приказки
**Описание:** Приказки, създадени от децата.

**Ключови полета:**
- `id` - Уникален идентификатор
- `child_id` - Дете собственик
- `title` - Заглавие на приказката (1-200 символа)
- `theme` - Тема на приказката (3-100 символа, използва се за генериране на content)
- `content` - Съдържание на приказката (текст, генерира се автоматично от theme)
- `image_url` - URL към изображението (nullable)
- `video_url` - URL към генерираното видео (nullable)
- `created_at` - Дата на създаване
- `updated_at` - Дата на последна актуализация

**Връзки:**
- Принадлежи на един `child` (много към едно)

**Валидации:**
- `title`: 1-200 символа, задължително
- `theme`: 3-100 символа, задължително при създаване
- `content`: генерира се автоматично от бекенда на базата на `theme`
- `image_url`: опционално, но трябва да има поне `image` или `image_url` при създаване
- `video_url`: опционално, генерира се чрез AI анимация

**Бизнес логика:**
- Приказките се създават с заглавие, тема и снимка
- Съдържанието (`content`) се генерира автоматично от бекенда на базата на темата (`theme`)
- Видеото се генерира чрез отделен endpoint (`POST /api/stories/:id/animate`)
- Приказките се сортират по дата на създаване (най-новите първо)
- Търсенето работи само по заглавие (минимум 3 символа)
- Снимките могат да се качват като файлове или да се предоставят като URL
- Има endpoints за валидация и анимиране на изображения (`POST /api/stories/validate-image`, `POST /api/stories/animate-image`)

---

### 8. `ai_sessions` - AI Разговори
**Описание:** Сесии с AI (Дневник / Сподели с приятел).

**Ключови полета:**
- `id` - Уникален идентификатор (VARCHAR, напр. 'sess_1')
- `child_id` - Дете собственик
- `child_name` - Име на детето (denormalized за по-бърз достъп)
- `title` - Заглавие на сесията
- `category` - Категория ('diary', 'share_friend')
- `message_count` - Брой съобщения
- `created_at` - Кога е създадена

**Връзки:**
- Принадлежи на един `child` (много към едно)
- Има много `ai_messages` (едно към много)
- Може да има един `ai_session_summaries` (едно към едно, nullable)

---

### 9. `ai_messages` - Съобщения в AI Сесии
**Описание:** Индивидуални съобщения в AI разговорите.

**Ключови полета:**
- `id` - Уникален идентификатор (VARCHAR, напр. 'm1')
- `session_id` - Референция към `ai_sessions.id`
- `role` - Роля ('user' или 'assistant')
- `content` - Съдържание на съобщението
- `created_at` - Кога е създадено

**Връзки:**
- Принадлежи на един `ai_session` (много към едно)

---

### 10. `ai_session_summaries` - Резюмета на AI Сесии
**Описание:** AI-генерирани резюмета на разговорите.

**Ключови полета:**
- `id` - Уникален идентификатор
- `session_id` - Референция към `ai_sessions.id` (уникален)
- `text` - Текст на резюмето
- `created_at` - Кога е генерирано

**Връзки:**
- Принадлежи на един `ai_session` (едно към едно)

**Бизнес логика:**
- Всяка сесия може да има максимум едно резюме
- Резюмето се генерира на заявка от родителя

---

### 11. `parent_dashboard_cache` - Кеш на Дашборд
**Описание:** Кеширани данни за родителския дашборд (опционално).

**Ключови полета:**
- `id` - Уникален идентификатор
- `child_id` - Референция към `children.id` (уникален)
- `last_login_at` - Последно влизане
- `last_ai_diary_at` - Последна AI сесия
- `recent_menu_activity` - JSON масив с последни активности
- `favorite_ai_category` - Най-често използвана категория
- `favorite_ai_category_label` - Локализиран етикет
- `mood_trend` - JSON масив с настроения по дни
- `current_interests` - JSON обект с текущи интереси

**Връзки:**
- Принадлежи на един `child` (едно към едно)

**Бележка:** Тази таблица е опционална. Данните могат да се генерират динамично от другите таблици.

---

### 12. `parent_notification_settings` - Настройки за Нотификации
**Описание:** Настройки за email нотификации на родителите.

**Ключови полета:**
- `id` - Уникален идентификатор
- `user_id` - Референция към `users.id` (уникален)
- `email_frequency` - Честота ('never', 'daily', 'weekly', 'monthly')

**Връзки:**
- Принадлежи на един `user` (едно към едно)

---

### 12. `child_activity_log` - Лог на Активност (Опционално)
**Описание:** Лог на активността на детето за дашборда.

**Ключови полета:**
- `id` - Уникален идентификатор
- `child_id` - Референция към `children.id`
- `activity_type` - Тип активност ('diary_share_friend', 'ai_friend_games', etc.)
- `activity_data` - JSON с допълнителни данни
- `created_at` - Кога е извършена активността

**Връзки:**
- Принадлежи на един `child` (много към едно)

**Бележка:** Тази таблица е опционална. Може да се използва за по-детайлен анализ на активността.

---

## Диаграма на Връзките

```
users (1) ──< (N) children
users (1) ──< (N) codes
users (1) ──< (N) user_sessions
users (1) ──< (N) push_tokens
users (1) ──< (1) parent_notification_settings

children (1) ──< (N) heroes
children (1) ──< (N) stories
children (1) ──< (N) ai_sessions
children (1) ──< (1) parent_dashboard_cache
children (1) ──< (N) child_activity_log
children (N) >──< (1) codes (assigned_child_id)

codes (1) >──< (1) children (code_id)

ai_sessions (1) ──< (N) ai_messages
ai_sessions (1) ──< (1) ai_session_summaries
```

---

## Важни Бележки

### Валидации

1. **Heroes:**
   - `name`: 3-12 символа
   - `mission`: максимум 30 символа
   - `backstory`: максимум 250 символа

2. **Codes:**
   - `code`: уникален
   - `status`: 'active', 'inactive', или 'expired'

3. **Users:**
   - `email`: уникален
   - `pin_status`: 'missing', 'set', или 'reset_required'

4. **AI Sessions:**
   - `category`: 'diary' или 'share_friend'

### Индекси

Всички foreign keys имат индекси за оптимизация на заявките. Допълнителни индекси са добавени за:
- Често търсени полета (`email`, `code`, `status`)
- Сортиране по дата (`created_at DESC`)
- Филтриране (`is_active`, `status`)

### JSON Полета

Следните полета използват JSON формат за гъвкаво съхранение:
- `recent_menu_activity` - масив от стрингове
- `mood_trend` - масив от обекти `{date, index}`
- `current_interests` - обект с `period_start`, `period_end`, `summary`, `source_session_ids`
- `activity_data` - произволен JSON обект

### Triggers

1. **trg_update_child_last_ai_diary** - Автоматично обновява `last_ai_diary_at` при нова AI сесия
2. **trg_update_code_assigned_child** - Автоматично синхронизира `assigned_child_id` в codes при промяна на `code_id` в children

### Views

1. **v_active_codes_with_children** - Активни кодове с асоциирани деца
2. **v_recent_ai_sessions** - Последни AI сесии с информация за съобщения и резюмета

---

## Миграции

При имплементация на реална база данни, препоръчително е да се създадат миграции в следния ред:

1. `users`
2. `user_sessions`, `push_tokens`, `parent_notification_settings`
3. `codes`
4. `children`
5. `heroes`
6. `ai_sessions`
7. `ai_messages`
8. `ai_session_summaries`
9. `parent_dashboard_cache` (опционално)
10. `child_activity_log` (опционално)
11. Views и Triggers

---

## Примерни Заявки

### Намиране на всички герои на дете
```sql
SELECT * FROM heroes WHERE child_id = 1 ORDER BY created_at DESC;
```

### Намиране на всички AI сесии с резюмета
```sql
SELECT s.*, ss.text as summary_text
FROM ai_sessions s
LEFT JOIN ai_session_summaries ss ON s.id = ss.session_id
WHERE s.child_id = 1
ORDER BY s.created_at DESC;
```

### Намиране на активни кодове без асоциирани деца
```sql
SELECT * FROM codes 
WHERE status = 'active' AND assigned_child_id IS NULL;
```

### Намиране на дете с неговия код
```sql
SELECT c.*, cd.code, cd.status as code_status
FROM children c
LEFT JOIN codes cd ON c.code_id = cd.id
WHERE c.id = 1;
```

---

## Версия

**Версия:** 1.0  
**Дата:** 2026-01-29  
**Базирано на:** Mock данни от `mock-backend/services/`
