INSERT INTO user_clients (
    user_id,
    client_id,
    role_id,
    created_at,
    updated_at,
    created_by,
    updated_by
) VALUES (
             /*user_id*/1,
             /*client_id*/1,
             /*role_id*/1,
                        strftime('%s','now'),
                        strftime('%s','now'),
             /*created_by*/1,
             /*updated_by*/1
         );