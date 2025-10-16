// users_password_update_check.js
// パスワード更新用リクエストパラメータ検証スクリプト

function check() {
    console.log(nyanAllParams);
    // 入力チェック（必要キーは SQL コメントで定義済み）
    nyanRequestCheck(["id", "access_token", "client_id", "client_secret"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            error: nyanErros
        });
    }

    // id が整数であることをチェック
    nyanIsID("id", nyanAllParams.id);

    // エラー返却
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    //存在するユーザーであること
    const user = nyanRunSQL("./sql/users_get.sql", { "id": nyanAllParams.id });
    if (!user) {
        nyanErros.id = 'User not found';
        return JSON.stringify({
            success: false,
            status: 404,
            error: nyanErros
        });
    }

    // 正常レスポンス
    return JSON.stringify({
        success: true,
        status: 200
    });
}

check();
