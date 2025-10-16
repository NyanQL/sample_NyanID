DELETE FROM access_tokens
WHERE expires_at < strftime('%s','now');