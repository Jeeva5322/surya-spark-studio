-- ─────────────────────────────────────────────────────────────────
-- Surya Electricals — Auth System Migration
-- Run this ONCE on your MySQL database: surya_electricals
-- ─────────────────────────────────────────────────────────────────

-- 1. Add approval-flow columns to users table
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS status ENUM('pending_approval','approved','active','rejected') NOT NULL DEFAULT 'pending_approval' AFTER role,
  ADD COLUMN IF NOT EXISTS setup_token VARCHAR(64) NULL AFTER status,
  ADD COLUMN IF NOT EXISTS setup_token_expiry DATETIME NULL AFTER setup_token,
  MODIFY COLUMN password VARCHAR(255) NULL;  -- Allow NULL until password is set

-- 2. Make name & phone optional (email-only signup now)
ALTER TABLE users
  MODIFY COLUMN name VARCHAR(255) NULL,
  MODIFY COLUMN phone VARCHAR(20) NULL;

-- 3. Set existing active users (those who already have passwords) to 'active'
UPDATE users SET status = 'active' WHERE password IS NOT NULL AND status = 'pending_approval';

-- 4. Ensure admin users stay active
UPDATE users SET status = 'active' WHERE role = 'admin';

-- ─────────────────────────────────────────────────────────────────
-- Verify the structure
-- ─────────────────────────────────────────────────────────────────
-- DESCRIBE users;
