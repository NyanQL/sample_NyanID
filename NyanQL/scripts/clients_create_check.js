function check() {
    tokenCheck();
    // 入力チェック（必要キーは SQL コメントで定義済み）
    nyanRequestCheck([
        "name",
        "redirect_uri",
        "secret",
        "access_token",
        "client_id",
        "client_secret"
    ]);
    if (Object.keys(nyanErros).length > 0) {
        // パラメータ不足や形式エラーがある場合は 400 を返す
        return JSON.stringify({
            success: false,
            status: 401,
            error: nyanErros
        });
    }
    //clients_name_check.sql id name
    const check = nyanRunSQL("./sql/clients_name_check.sql" , {id: 0, name: nyanAllParams.name});
    if(check){
        nyanErros.name = "The same name has already been registered.";
        return JSON.stringify({
            success: false,
            status: 401,
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
