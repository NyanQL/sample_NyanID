UPDATE clients
SET
    name         = /*name*/'client_name',
    redirect_uri = /*redirect_uri*/'http://localhost/callback',
    secret       = /*secret*/'secret_key',
    updated_at   = strftime('%s','now'),
    updated_by   = /*updated_by*/1
WHERE id = /*id*/1;