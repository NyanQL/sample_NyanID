select
    user_id, token, expires_at
from refresh_tokens
where token = /*refresh_token*/"token";