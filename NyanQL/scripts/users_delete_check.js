// パスワード以外を更新
function check() {
    console.log(nyanAllParams);
    nyanRequestCheck(["id"]);
    tokenCheck();
    if (Object.keys(nyanErros).length > 0) {
        //エラーのチェックと対応
        return JSON.stringify({
            success: false,
            status: 401,
            error: nyanErros
        });
    }

    //userが存在するかどうかチェック
    let user = nyanRunSQL("./sql/users_get.sql", nyanAllParams);
    console.log(user);
    if(! user){
        nyanErros.id = 'User not found';
        return JSON.stringify({success: false, status: 401, error: nyanErros});
    }

    return JSON.stringify({ success: true, status: 200 });
}

check();
