CREATE TABLE IF NOT EXISTS todo (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    label TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);