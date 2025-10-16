SELECT
    c.id             AS client_id,
    c.name           AS client_name,
    c.redirect_uri   AS redirect_uri,
    CASE
        WHEN uc.user_id IS NULL THEN 0
        ELSE 1
        END               AS assigned,     -- 0=未設定, 1=設定済み
    COALESCE(uc.role_id, 0) AS role_id -- 設定済みならrole_id, 未設定なら0
FROM clients c
         LEFT JOIN user_clients uc
                   ON c.id = uc.client_id
                       AND uc.user_id = /*id*/1
ORDER BY c.id;
