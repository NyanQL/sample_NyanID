UPDATE users
SET
    password_hash = /*password*/"newpassword",
    updated_at = strftime('%s','now'),
    updated_by = /*updated_by*/1
WHERE id = /*id*/1;
