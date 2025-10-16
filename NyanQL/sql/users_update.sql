UPDATE users
SET
    username   = /*username*/"username",
    email      = /*email*/"email@example.com",
    updated_by = /*updated_by*/1 ,
    updated_at = strftime('%s','now')
WHERE id = /*id*/1;
