-- =====================================================
-- HeroPop Mobile App - Database Schema
-- =====================================================
-- Тази схема е извлечена от всички мокнати данни в services/
-- Дата: 2026-01-29
-- =====================================================

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
-- Потребители (родители)
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    has_pin BOOLEAN DEFAULT FALSE,
    pin_hash VARCHAR(255) NULL,
    pin_status ENUM('missing', 'set', 'reset_required') DEFAULT 'missing',
    is_parent BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255) NULL,
    password_reset_token VARCHAR(255) NULL,
    password_reset_expires_at TIMESTAMP NULL,
    email_change_token VARCHAR(255) NULL,
    email_change_expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_email_verification_token (email_verification_token),
    INDEX idx_password_reset_token (password_reset_token),
    INDEX idx_email_change_token (email_change_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 2. USER_SESSIONS TABLE
-- =====================================================
-- Сесии на потребителите (JWT tokens)
CREATE TABLE user_sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    access_token VARCHAR(500) NOT NULL,
    refresh_token VARCHAR(500) NOT NULL,
    device_info TEXT NULL,
    ip_address VARCHAR(45) NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_refresh_token (refresh_token),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 3. PUSH_TOKENS TABLE
-- =====================================================
-- Push notification tokens за устройства
CREATE TABLE push_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token VARCHAR(500) NOT NULL,
    device_type ENUM('ios', 'android') NULL,
    device_id VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_device (user_id, device_id),
    INDEX idx_user_id (user_id),
    INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 4. CODES TABLE
-- =====================================================
-- Кодове за активиране на детски профили
CREATE TABLE codes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL, -- Собственик на кода (родител)
    code VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('active', 'inactive', 'expired') DEFAULT 'inactive',
    activated_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    assigned_child_id BIGINT NULL, -- Асоциирано дете
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_child_id) REFERENCES children(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_code (code),
    INDEX idx_status (status),
    INDEX idx_assigned_child_id (assigned_child_id),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 5. CHILDREN TABLE
-- =====================================================
-- Детски профили
CREATE TABLE children (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL, -- Родител собственик
    name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500) NULL,
    avatar_key VARCHAR(50) NULL, -- 'bear', 'unicorn', 'robot', 'cat', etc.
    is_active BOOLEAN DEFAULT TRUE,
    age INT NULL,
    interests TEXT NULL,
    ai_restrictions TEXT NULL,
    code_id BIGINT NULL, -- Асоцииран код
    last_login_at TIMESTAMP NULL,
    last_ai_diary_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (code_id) REFERENCES codes(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_code_id (code_id),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 6. HEROES TABLE
-- =====================================================
-- Герои (рисунки) на децата
CREATE TABLE heroes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    child_id BIGINT NOT NULL,
    name VARCHAR(12) NOT NULL, -- 3-12 символа
    image_url VARCHAR(500) NULL,
    mission VARCHAR(30) NULL, -- Максимум 30 символа
    backstory VARCHAR(250) NULL, -- Максимум 250 символа
    video_url VARCHAR(500) NULL, -- URL към анимирано видео
    is_best_friend BOOLEAN DEFAULT FALSE, -- Дали героят е най-добър приятел
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    INDEX idx_child_id (child_id),
    INDEX idx_created_at (created_at DESC),
    INDEX idx_video_url (video_url),
    INDEX idx_is_best_friend (child_id, is_best_friend) -- За бързо търсене на най-добър приятел
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 7. STORIES TABLE
-- =====================================================
-- Приказки на децата
CREATE TABLE stories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    child_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    theme VARCHAR(100) NOT NULL,
    content TEXT NULL,
    image_url VARCHAR(500) NULL,
    video_url VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    INDEX idx_child_id (child_id),
    INDEX idx_title (title),
    INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 8. AI_SESSIONS TABLE
-- =====================================================
-- AI разговори (Дневник / Сподели с приятел)
CREATE TABLE ai_sessions (
    id VARCHAR(100) PRIMARY KEY, -- 'sess_1', 'sess_2', etc.
    child_id BIGINT NOT NULL,
    child_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    category ENUM('diary', 'share_friend') NULL,
    message_count INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    INDEX idx_child_id (child_id),
    INDEX idx_created_at (created_at DESC),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 9. AI_MESSAGES TABLE
-- =====================================================
-- Съобщения в AI сесии
CREATE TABLE ai_messages (
    id VARCHAR(100) PRIMARY KEY, -- 'm1', 'm2', etc.
    session_id VARCHAR(100) NOT NULL,
    role ENUM('user', 'assistant') NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    
    FOREIGN KEY (session_id) REFERENCES ai_sessions(id) ON DELETE CASCADE,
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 10. AI_SESSION_SUMMARIES TABLE
-- =====================================================
-- Резюмета на AI сесии (генерирани от AI)
CREATE TABLE ai_session_summaries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(100) NOT NULL UNIQUE,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (session_id) REFERENCES ai_sessions(id) ON DELETE CASCADE,
    INDEX idx_session_id (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 11. PARENT_DASHBOARD_CACHE TABLE
-- =====================================================
-- Кеширани данни за родителския дашборд
-- (Опционално - може да се генерира динамично)
CREATE TABLE parent_dashboard_cache (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    child_id BIGINT NOT NULL,
    last_login_at TIMESTAMP NULL,
    last_ai_diary_at TIMESTAMP NULL,
    recent_menu_activity JSON NULL, -- ['diary_share_friend', 'ai_friend_games', etc.]
    favorite_ai_category VARCHAR(100) NULL,
    favorite_ai_category_label VARCHAR(255) NULL,
    mood_trend JSON NULL, -- [{"date": "2026-01-18", "index": 2}, ...]
    current_interests JSON NULL, -- {"period_start": "...", "period_end": "...", "summary": "...", "source_session_ids": [...]}
    cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    UNIQUE KEY unique_child_cache (child_id),
    INDEX idx_child_id (child_id),
    INDEX idx_cached_at (cached_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 12. PARENT_NOTIFICATION_SETTINGS TABLE
-- =====================================================
-- Настройки за email нотификации на родители
CREATE TABLE parent_notification_settings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    email_frequency ENUM('never', 'daily', 'weekly', 'monthly') DEFAULT 'never',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 13. CHILD_ACTIVITY_LOG TABLE (Опционално)
-- =====================================================
-- Лог на активността на детето (за dashboard)
CREATE TABLE child_activity_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    child_id BIGINT NOT NULL,
    activity_type VARCHAR(100) NOT NULL, -- 'diary_share_friend', 'ai_friend_games', 'profile_settings', etc.
    activity_data JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    INDEX idx_child_id (child_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- VIEWS (Опционално)
-- =====================================================

-- View за активни кодове с асоциирани деца
CREATE VIEW v_active_codes_with_children AS
SELECT 
    c.id,
    c.code,
    c.status,
    c.activated_at,
    c.expires_at,
    ch.id AS child_id,
    ch.name AS child_name
FROM codes c
LEFT JOIN children ch ON c.assigned_child_id = ch.id
WHERE c.status IN ('active', 'inactive')
ORDER BY c.activated_at DESC;

-- View за последни AI сесии по дете
CREATE VIEW v_recent_ai_sessions AS
SELECT 
    s.id,
    s.child_id,
    s.child_name,
    s.title,
    s.message_count,
    s.created_at,
    SUM(CASE WHEN m.id IS NOT NULL THEN 1 ELSE 0 END) AS actual_message_count,
    CASE WHEN ss.id IS NOT NULL THEN TRUE ELSE FALSE END AS has_summary
FROM ai_sessions s
LEFT JOIN ai_messages m ON s.id = m.session_id
LEFT JOIN ai_session_summaries ss ON s.id = ss.session_id
GROUP BY s.id, s.child_id, s.child_name, s.title, s.message_count, s.created_at, ss.id
ORDER BY s.created_at DESC;

-- =====================================================
-- TRIGGERS (Опционално)
-- =====================================================

-- Автоматично обновяване на last_ai_diary_at при нова AI сесия
DELIMITER //
CREATE TRIGGER trg_update_child_last_ai_diary
AFTER INSERT ON ai_sessions
FOR EACH ROW
BEGIN
    UPDATE children 
    SET last_ai_diary_at = NEW.created_at
    WHERE id = NEW.child_id;
END//
DELIMITER ;

-- Автоматично обновяване на assigned_child в codes при промяна на дете
DELIMITER //
CREATE TRIGGER trg_update_code_assigned_child
AFTER UPDATE ON children
FOR EACH ROW
BEGIN
    IF OLD.code_id != NEW.code_id THEN
        -- Премахване от стария код
        UPDATE codes 
        SET assigned_child_id = NULL 
        WHERE assigned_child_id = OLD.id;
        
        -- Добавяне към новия код
        IF NEW.code_id IS NOT NULL THEN
            UPDATE codes 
            SET assigned_child_id = NEW.id,
                status = 'active'
            WHERE id = NEW.code_id;
        END IF;
    END IF;
END//
DELIMITER ;

-- =====================================================
-- INITIAL DATA / SEEDS (Опционално)
-- =====================================================

-- Примерни данни за тестване (може да се използват за development)
-- INSERT INTO users (email, password_hash, full_name, has_pin, pin_status, is_parent) 
-- VALUES ('test@example.com', '$2b$10$...', 'Test User', TRUE, 'set', TRUE);

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Всички TIMESTAMP полета използват CURRENT_TIMESTAMP по подразбиране
-- 2. Всички foreign keys имат ON DELETE CASCADE или ON DELETE SET NULL според логиката
-- 3. Индексите са оптимизирани за често използвани заявки
-- 4. JSON полетата се използват за гъвкаво съхранение на структурирани данни
-- 5. ENUM типовете ограничават валидните стойности
-- 6. VARCHAR дължините са базирани на валидациите в mock данните
-- 7. UNIQUE constraints гарантират уникалност където е необходимо
-- 8. Views и Triggers са опционални, но полезни за оптимизация
