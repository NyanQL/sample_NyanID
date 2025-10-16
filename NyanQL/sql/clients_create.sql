INSERT INTO clients (
    name,
    redirect_uri,
    secret,
    created_at,
    updated_at,
    created_by,
    updated_by
) VALUES (
             /*name*/'my_client',
             /*redirect_uri*/'http://localhost:8101/',
             /*secret*/'dummy_secret_ABC123',
             strftime('%s','now'),
             strftime('%s','now'),
             /*created_by*/1,
             /*created_by*/1
         );
