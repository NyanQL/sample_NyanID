INSERT INTO access_tokens (
    user_id,
    client_id,
    token,
    expires_at,
    created_at,
    updated_at,
    created_by,
    updated_by
) VALUES (
             /*user_id*/1,
             /*client_id*/1,
             /*token*/'generatedAccessToken',
             /*expires_at*/1719830400,
                        strftime('%s','now'),
                        strftime('%s','now'),
             /*created_by*/1,
             /*updated_by*/1
         )
    RETURNING token;