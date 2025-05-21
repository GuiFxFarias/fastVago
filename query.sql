CREATE TABLE leisure_areas (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    price_per_hour DECIMAL(10,2),
    max_guests INTEGER,
    has_pool BOOLEAN DEFAULT FALSE,
    has_bbq BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    leisure_area_id INTEGER NOT NULL REFERENCES leisure_areas(id),
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20),
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_price DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
