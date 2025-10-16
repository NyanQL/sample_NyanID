
function check() {


    nyanRequestCheck(["id", "client_id", "client_secret", "password"]);
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
console.log(nyanAllParams);
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
    console.log("## 1 ################");

    // 正常レスポンス
    return JSON.stringify({
        success: true,
        status: 200
    });
}

check();
