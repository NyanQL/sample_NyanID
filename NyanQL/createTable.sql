PRAGMA foreign_keys = ON;

-- users テーブル
CREATE TABLE IF NOT EXISTS users (
                                     id             INTEGER PRIMARY KEY AUTOINCREMENT,
                                     username       TEXT    UNIQUE NOT NULL,
                                     email          TEXT    UNIQUE NOT NULL,
                                     password_hash  TEXT    NOT NULL,
                                     salt           TEXT    NOT NULL,
                                     created_at     INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    updated_at     INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    created_by     INTEGER NOT NULL,
    updated_by     INTEGER NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (updated_by) REFERENCES users(id)
    );

CREATE TABLE IF NOT EXISTS clients (
                                       id            INTEGER PRIMARY KEY AUTOINCREMENT,
                                       name          TEXT    UNIQUE NOT NULL,
                                       redirect_uri  TEXT    NOT NULL,
                                       secret        TEXT    NOT NULL,
                                       scopes        TEXT    ,
                                       created_at    INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    updated_at    INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    created_by    INTEGER NOT NULL,
    updated_by    INTEGER NOT NULL
    );

-- refresh_tokens テーブル
CREATE TABLE IF NOT EXISTS refresh_tokens (
                                              user_id       INTEGER NOT NULL,
                                              token         TEXT PRIMARY KEY,
                                              expires_at    INTEGER NOT NULL,
                                              created_at    INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    updated_at    INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    created_by    INTEGER NOT NULL,
    updated_by    INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

-- password_reset_tokens テーブル
CREATE TABLE IF NOT EXISTS password_reset_tokens (
                                                     user_id       INTEGER NOT NULL,
                                                     token         TEXT PRIMARY KEY,
                                                     expires_at    TEXT NOT NULL,
                                                     created_at    INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    updated_at    INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    created_by    INTEGER NOT NULL,
    updated_by    INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS access_tokens (
                                             id            INTEGER PRIMARY KEY AUTOINCREMENT,
                                             user_id       INTEGER NOT NULL,
                                             client_id     INTEGER NOT NULL,
                                             token         TEXT UNIQUE NOT NULL,
                                             expires_at    INTEGER NOT NULL,
                                             created_at    INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    updated_at    INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    created_by    INTEGER NOT NULL,
    updated_by    INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS user_clients (
                                            user_id     INTEGER NOT NULL,
                                            client_id   INTEGER NOT NULL,
                                            role_id     INTEGER NOT NULL,                                  -- roles.id を保持
                                            created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    updated_at  INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    created_by  INTEGER NOT NULL,
    updated_by  INTEGER NOT NULL,
    PRIMARY KEY (user_id, client_id),
    FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id)   REFERENCES roles(id)   ON DELETE CASCADE
    );

-- nyanID自身
INSERT INTO clients (
    id,
    name,
    redirect_uri,
    secret,
    scopes,
    created_at,
    updated_at,
    created_by,
    updated_by
) VALUES (
             1,
             'nyanID',
             'http://localhost:8101/',
             'Uc3ubFaHyXuJ',
             'read,write',
             strftime('%s','now'),
             strftime('%s','now'),
             1,
             1
         )
    ON CONFLICT(id) DO NOTHING;