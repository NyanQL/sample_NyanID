
function check() {
    tokenCheck();
    nyanRequestCheck(["id", "username" , "email", "user_client", "client_id", "client_secret", "access_token"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    const { id, username, email} = nyanAllParams;

    //idが数字かどうかチェック
    nyanIsID("id", id);
    //email書式チェック

    nyanRequestCheckEmail("email" , email);

    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    //userが存在するかどうかチェック
    let user = nyanRunSQL("./sql/users_get.sql", { "id": id });
    if(! user){
        nyanErros.id = 'This user not found';
        return JSON.stringify({success: false, status: 401, error: nyanErros});
    }

    let checkUser = nyanRunSQL("./sql/users_update_check.sql", nyanAllParams);
    if(checkUser){
        nyanErros.id = 'The email or username is already in use.';
        return JSON.stringify({success: false, status: 401, error: nyanErros});
    }

    return JSON.stringify({ success: true, status: 200 });
}

check();
