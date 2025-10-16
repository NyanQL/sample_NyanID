function check() {

    tokenCheck();
    nyanRequestCheck(["id" , "client_id" , "client_secret" ,"access_token"]);
    nyanIsID("id" , nyanAllParams);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            error: nyanErros
        });
    }

    // エラー返却
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 404,
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