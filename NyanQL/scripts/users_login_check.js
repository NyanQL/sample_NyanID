// users_login_check.js
// ログイン用リクエストパラメータ検証スクリプト

function main() {
    // 入力チェック（必要キーは SQL コメントで定義済み）
    nyanRequestCheck(["username", "password"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            error: nyanErros
        });
    }

    let user = nyanRunSQL("./sql/users_login_check.sql", nyanAllParams);
    if(! user)
    {
        nyanErros.username = 'username is not found';
        return JSON.stringify({
            success: false,
            status: 404,
            error: nyanErros
        });
    }

    //clientの確認
    console.log(nyanAllParams);

    let clients = nyanRunSQL("./sql/clients_search.sql",
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

    // パスワードのハッシュ化
    let password = sha256( user[0].salt + nyanAllParams.password + "_" + apiPasswordHash);
    console.log(password);
    console.log(user[0]["password_hash"]);
    if(user[0]["password_hash"] != password)
    {
        nyanErros.password = 'password is not correct';
        return JSON.stringify({
            success: false,
            status: 401,
            error: nyanErros
        });
    }

    //利用可能なサービスか確認
    console.log(user[0]);
    const user_client = nyanRunSQL("./sql/user_clients_login_check.sql", {user_id: user[0].id, client_id: nyanAllParams.client_id});
    console.log(user_client);
    if(! user_client)
    {
        nyanErros.client_id = 'This user is not available.';
    }

    // エラー返却
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    // 正常レスポンス
    return JSON.stringify({
        success: true,
        status: 200
    });
}

main();
