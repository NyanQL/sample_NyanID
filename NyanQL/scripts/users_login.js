
function main() {
    //check.jsでパスワード認証まで終わっている。
    // ここからは、ユーザ情報の取得を行う。
    let users = nyanRunSQL("./sql/users_login_check.sql", nyanAllParams);
    if(! users)
    {
        nyanErros.username = 'username is not found';
        return JSON.stringify({
            success: false,
            status: 404,
            error: nyanErros
        });
    }

    const clients = nyanRunSQL("./sql/clients_search.sql",
        {
            "client_id": nyanAllParams.client_id,
            "client_secret": nyanAllParams.client_secret
        });
    if(! clients)    {
        nyanErros.client_id = 'client_id is not found';
        return JSON.stringify({
            success: false,
            status: 404,
            error: nyanErros
        });
    }
    const client = clients[0];

    let user = users[0];
    let insertData = {
        "client_id": client.id,
        "user_id"   : user.id,
        "token"      : sha256(Math.random() + user.id + Math.floor(Date.now() / 1000)),
        "expires_at" : Math.floor(Date.now() / 1000) + refreshTokenExpires,
        "created_by" : user.id,
        "updated_by": user.id
    };

    //このuserに対してnyanIDに対してtokenを発行する
    nyanRunSQL("./sql/refresh_tokens_clear.sql", {});
    nyanRunSQL("./sql/access_token_create.sql", insertData);
    nyanRunSQL("./sql/refresh_tokens_create.sql", insertData);

    let access_token = nyanRunSQL("./sql/access_token_by_user.sql", insertData);
    let refresh_token = nyanRunSQL("./sql/refresh_tokens_by_user.sql", insertData);

    //console.log(refresh_token);

    return  JSON.stringify({
        success: true,
        status: 200,
        result: {
            refresh_token: refresh_token[0],
            access_token: access_token[0].token
        }
    });
    
}

main();

// INSERT INTO refresh_tokens ( user_id, token, expires_at, created_at, updated_at, created_by, updated_by ) VALUES ( 1, "ab4a8679d318ebf3d0b6ac6a368e278ed1315cd22979fbc17cafb0199e6a4bc6",strftime('%s','now') , strftime('%s','now'), strftime('%s','now'),1, 1 )