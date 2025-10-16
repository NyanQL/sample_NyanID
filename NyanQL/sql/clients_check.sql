SELECT
    id,
    name,
    redirect_uri,
    strftime('%Y-%m-%d %H:%M:%S', created_at, 'unixepoch', 'localtime') AS created_at,
    strftime('%Y-%m-%d %H:%M:%S', updated_at, 'unixepoch', 'localtime') AS updated_at
FROM clients
WHERE id = /*client_id*/1 AND secret = /*client_secret*/"secret"
ORDER BY created_at DESC;