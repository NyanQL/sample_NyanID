function check() {
    // 入力チェック（必要キーは SQL コメントで定義済み）
    tokenCheck();
    nyanRequestCheck(["id" , "client_id" , "client_secret" , "access_token"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            error: nyanErros
        });
    }

    nyanIsID("id" , nyanAllParams.id);
    // エラー返却
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    //存在するかどうかチェック
    let client = nyanRunSQL("./sql/clients_get.sql", nyanAllParams);
    if (! client) {
        nyanErros.id = 'client not found';
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

check();
