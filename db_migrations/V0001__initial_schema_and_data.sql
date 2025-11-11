-- Создание таблицы мастеров
CREATE TABLE IF NOT EXISTS masters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы услуг
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы клиентов
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    last_visit TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы записей
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    master_id INTEGER REFERENCES masters(id),
    service_id INTEGER REFERENCES services(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_appointment UNIQUE (master_id, appointment_date, appointment_time)
);

-- Создание индексов для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_master ON appointments(master_id);
CREATE INDEX IF NOT EXISTS idx_appointments_client ON appointments(client_id);

-- Добавление тестовых данных

-- Мастера
INSERT INTO masters (name, specialization, phone, email) 
SELECT 'Анна Смирнова', 'Стилист-универсал', '+7 (999) 123-45-67', 'anna@salon.ru'
WHERE NOT EXISTS (SELECT 1 FROM masters WHERE email = 'anna@salon.ru');

INSERT INTO masters (name, specialization, phone, email) 
SELECT 'Мария Петрова', 'Колорист', '+7 (999) 234-56-78', 'maria@salon.ru'
WHERE NOT EXISTS (SELECT 1 FROM masters WHERE email = 'maria@salon.ru');

INSERT INTO masters (name, specialization, phone, email) 
SELECT 'Екатерина Иванова', 'Барбер', '+7 (999) 345-67-89', 'kate@salon.ru'
WHERE NOT EXISTS (SELECT 1 FROM masters WHERE email = 'kate@salon.ru');

-- Услуги
INSERT INTO services (name, description, duration_minutes, price) 
SELECT 'Женская стрижка', 'Стрижка любой сложности', 60, 1500.00
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Женская стрижка');

INSERT INTO services (name, description, duration_minutes, price) 
SELECT 'Мужская стрижка', 'Классическая мужская стрижка', 45, 1000.00
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Мужская стрижка');

INSERT INTO services (name, description, duration_minutes, price) 
SELECT 'Окрашивание', 'Окрашивание волос профессиональными красителями', 120, 3500.00
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Окрашивание');

INSERT INTO services (name, description, duration_minutes, price) 
SELECT 'Укладка', 'Профессиональная укладка волос', 30, 800.00
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Укладка');

INSERT INTO services (name, description, duration_minutes, price) 
SELECT 'Стрижка бороды', 'Моделирование и уход за бородой', 30, 700.00
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Стрижка бороды');

INSERT INTO services (name, description, duration_minutes, price) 
SELECT 'Комплекс: стрижка + укладка', 'Женская стрижка с укладкой', 90, 2000.00
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Комплекс: стрижка + укладка');