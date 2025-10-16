INSERT INTO users (
    id,
    username,
    email,
    password_hash,
    salt,
    created_at,
    updated_at,
    created_by,
    updated_by
) VALUES (
             1,
             'dummy_user',
             'dummy@example.com',
             'da09f7d0d63ffefd6861a9208cf63055b3992f70f5eca31e638d8ec694757804', /*1234*/
             'randomsalt123',
             strftime('%s','now'),
             strftime('%s','now'),
             1,
             1
         )
    ON CONFLICT(id) DO NOTHING;


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
    'localhost_client',
    'http://localhost:8101/',
    'dummy_secret',
    'read,write',
    strftime('%s','now'),
    strftime('%s','now'),
    1,
    1
)
ON CONFLICT(id) DO NOTHING;

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
             2,
             'localhost_client2',
             'http://localhost:8101/',
             'dummy_secret2',
             'read,write',
             strftime('%s','now'),
             strftime('%s','now'),
             1,
             1
         )
    ON CONFLICT(id) DO NOTHING;

INSERT INTO roles (
    name,
    description,
    scopes,
    created_at,
    updated_at,
    created_by,
    updated_by
) VALUES
-- 管理者
('admin', '管理者', 'read,write,admin', strftime('%s','now'), strftime('%s','now'), 1, 1),

-- 会員
('member', '会員', 'read,write', strftime('%s','now'), strftime('%s','now'), 1, 1),

-- ゲスト
('guest', 'ゲスト', 'read', strftime('%s','now'), strftime('%s','now'), 1, 1);

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