// clients_update リクエストパラメータ検証スクリプト

function check() {
    tokenCheck();
    // 入力チェック（必要キーは SQL コメントで定義済み）
    nyanRequestCheck([
        "id",
        "name",
        "redirect_uri",
        "secret",
        "access_token",
        "client_id",
        "client_secret"
    ]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            error: nyanErros
        });
    }

    // id が整数であることをチェック
    nyanIsID("id" , nyanAllParams);

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
        nyanErros.id = 'id not found';
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    //同じ名前のものが自分以外にいないか確認をする
    let clientNameCheck = nyanRunSQL("./sql/clients_name_check.sql", nyanAllParams);
    if (clientNameCheck) {
        nyanErros.id = 'id not found';
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
