INSERT INTO users (
    username,
    email,
    salt,
    password_hash,
    created_at,
    updated_at,
    created_by,
    updated_by
) VALUES (
             /*username*/"username",
             /*email*/"email@example.com",
              /*salt*/"randomSalt",
            /*password*/"hashedPassword",
            strftime('%s','now'),
            strftime('%s','now'),
             /*created_by*/1,
             /*created_by*/1
         ) RETURNING id;

