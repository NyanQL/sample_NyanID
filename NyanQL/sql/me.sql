SELECT
    u.id,
    uc.role_id
FROM access_tokens AS at
JOIN users AS u ON u.id = at.user_id
    JOIN clients AS c ON c.id = at.client_id
    JOIN user_clients AS uc ON uc.user_id = u.id AND uc.client_id = c.id
WHERE
    at.token = /*access_token*/'509f5283493479c0eabfd648c40e4190865f5126c56f372c281d1dc12488ed79'
  AND c.id = /*client_id*/3
  AND c.secret = /*client_secret*/'Yl5SUvEd'
  AND at.expires_at > strftime('%s', 'now')
LIMIT 1;