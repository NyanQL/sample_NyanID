DELETE FROM refresh_tokens
WHERE expires_at < strftime('%s','now');