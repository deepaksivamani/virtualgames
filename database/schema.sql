-- Database: virtualgames_db

-- 1. USERS TABLE
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL, -- Added for auth
    password_hash VARCHAR(255) NOT NULL, -- Added for auth
    avatar_url TEXT,
    join_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_online TIMESTAMP WITH TIME ZONE,
    total_points INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    games_won INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. GAME ROOMS TABLE
CREATE TABLE game_rooms (
    room_id VARCHAR(10) PRIMARY KEY, -- Using short codes like 'ABCD'
    host_id UUID REFERENCES users(user_id),
    room_name VARCHAR(100),
    max_players INTEGER DEFAULT 8,
    game_type VARCHAR(20) NOT NULL, -- 'draw', 'rebus', etc.
    team_mode BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'waiting', -- 'waiting', 'playing', 'finished'
    created_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_time TIMESTAMP WITH TIME ZONE
);

-- 3. LEADERBOARDS TABLE
-- Note: Rank is typically calculated dynamically, but can be cached here
CREATE TABLE leaderboards (
    leaderboard_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    points INTEGER NOT NULL DEFAULT 0,
    rank INTEGER, -- Cached rank position
    season_id VARCHAR(20) DEFAULT 'global', -- For seasonal resets
    last_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES for Performance
CREATE INDEX idx_users_points ON users(total_points DESC);
CREATE INDEX idx_rooms_status ON game_rooms(status);
CREATE INDEX idx_leaderboard_points ON leaderboards(points DESC);
