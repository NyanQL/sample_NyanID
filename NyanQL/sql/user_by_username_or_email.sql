SELECT
    id,
    username,
    email,
    strftime('%Y-%m-%d %H:%M:%S', created_at, 'unixepoch', 'localtime') AS created_at,
    strftime('%Y-%m-%d %H:%M:%S', updated_at, 'unixepoch', 'localtime') AS updated_at
FROM users
WHERE
    username = /*username*/'username'
   OR email    = /*username*/'email@example.com';