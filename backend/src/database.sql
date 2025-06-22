-- GreenVestX Database Schema

-- Create database (run this separately)
-- CREATE DATABASE greenvestx;

-- Connect to the database and run the following:

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    goal_amount DECIMAL(15,2) NOT NULL,
    raised_amount DECIMAL(15,2) DEFAULT 0,
    token_code VARCHAR(20) UNIQUE NOT NULL,
    token_price DECIMAL(10,2) DEFAULT 1.0,
    project_owner_wallet VARCHAR(255),
    duration VARCHAR(100),
    expected_return DECIMAL(5,2),
    start_date DATE,
    end_date DATE,
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investments table
CREATE TABLE IF NOT EXISTS investments (
    id SERIAL PRIMARY KEY,
    user_wallet VARCHAR(255) NOT NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL,
    tokens_received DECIMAL(15,2) NOT NULL,
    transaction_hash VARCHAR(255),
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table (optional, for future use)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100),
    email VARCHAR(255),
    profile_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project categories table
CREATE TABLE IF NOT EXISTS project_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(20),
    description TEXT
);

-- Insert default categories
INSERT INTO project_categories (name, icon, color, description) VALUES
('solar', 'Sun', 'text-yellow-500', 'Güneş enerjisi projeleri'),
('wind', 'Wind', 'text-blue-500', 'Rüzgar enerjisi projeleri'),
('forest', 'TreePine', 'text-green-600', 'Ağaçlandırma projeleri'),
('water', 'Droplets', 'text-blue-400', 'Su projeleri')
ON CONFLICT (name) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (
    title, 
    description, 
    category, 
    location, 
    goal_amount, 
    raised_amount, 
    token_code, 
    duration, 
    expected_return,
    image_url
) VALUES
(
    'Güneş Enerjisi Çiftliği',
    'Antalya''da 5MW güneş enerjisi santrali kurulumu. Yıllık 7.5GWh elektrik üretimi hedefleniyor.',
    'solar',
    'Antalya, Türkiye',
    500000.00,
    320000.00,
    'SOLAR01',
    '18 ay',
    12.00,
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400'
),
(
    'Ağaçlandırma Projesi',
    'İstanbul''da 10,000 ağaç dikimi ve 5 yıl bakım projesi. Karbon emisyonu azaltma hedefi.',
    'forest',
    'İstanbul, Türkiye',
    150000.00,
    89000.00,
    'FOREST01',
    '5 yıl',
    8.00,
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
),
(
    'Rüzgar Türbini',
    'Çanakkale''de 2MW rüzgar enerjisi projesi. Yıllık 4.2GWh elektrik üretimi.',
    'wind',
    'Çanakkale, Türkiye',
    800000.00,
    450000.00,
    'WIND01',
    '24 ay',
    15.00,
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400'
),
(
    'Su Arıtma Tesisi',
    'Mersin''de günlük 1000 ton kapasiteli su arıtma tesisi. Deniz suyu tuzdan arındırma.',
    'water',
    'Mersin, Türkiye',
    1200000.00,
    780000.00,
    'WATER01',
    '30 ay',
    18.00,
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
),
(
    'Güneş Paneli Kurulumu',
    'İzmir''de 100 ev için güneş paneli kurulumu. Ev sahiplerine enerji tasarrufu.',
    'solar',
    'İzmir, Türkiye',
    300000.00,
    180000.00,
    'SOLAR02',
    '12 ay',
    10.00,
    'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=400'
),
(
    'Orman Koruma Projesi',
    'Trabzon''da 500 hektar orman alanının korunması ve sürdürülebilir yönetimi.',
    'forest',
    'Trabzon, Türkiye',
    250000.00,
    120000.00,
    'FOREST02',
    '10 yıl',
    6.00,
    'https://images.unsplash.com/photo-1511497584788-876760111969?w=400'
)
ON CONFLICT (token_code) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_investments_user_wallet ON investments(user_wallet);
CREATE INDEX IF NOT EXISTS idx_investments_project_id ON investments(project_id);
CREATE INDEX IF NOT EXISTS idx_investments_created_at ON investments(created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 