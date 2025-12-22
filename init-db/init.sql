-- =============================================================================
-- TypingFast Database Initialization Script
-- This script runs automatically when the MySQL container starts
-- =============================================================================

-- Create the database if it doesn't exist (handled by MySQL env var)
-- The database 'typingfast' is created automatically via MYSQL_DATABASE env var

-- Grant privileges to the application user
GRANT ALL PRIVILEGES ON typingfast.* TO 'typinguser'@'%';
FLUSH PRIVILEGES;

-- Optional: Create any initial data or seed data here
-- Example:
-- INSERT INTO users (username, email, password) VALUES ('testuser', 'test@example.com', 'hashedpassword');

-- Note: Table creation is handled by Hibernate (spring.jpa.hibernate.ddl-auto=update)
