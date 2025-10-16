INSERT INTO refresh_tokens (
    user_id,
    token,
    expires_at,
    created_at,
    updated_at,
    created_by,
    updated_by
) VALUES (
             /*user_id*/1,
             /*token*/'token1',
             /*expires_at*/171983040000,
                        strftime('%s','now'),
                        strftime('%s','now'),
             /*created_by*/1,
             /*updated_by*/1
         ) ;