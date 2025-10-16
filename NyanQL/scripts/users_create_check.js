const nyanAcceptedParams = {
    "created_by": 1,
    "email": "email@example.com",
    "username": "username"
};

function main(){
    //リクエストのチェック
    tokenCheck();
    nyanRequestCheck(["username", "email"]);
    if (Object.keys(nyanErros).length > 0) {
        //エラーのチェックと対応
        return JSON.stringify({success: false, status: 401, error: nyanErros});
    }

    //email書式チェック
    nyanRequestCheckEmail("email" , nyanAllParams.email);

    //重複チェック
    let user = nyanRunSQL("./sql/users_create_check.sql", nyanAllParams);
    console.log(user);
    if(user) {
        return JSON.stringify({success: false, status: 401, error: "email or username already exists"});
    }

    return JSON.stringify({success: true, status: 200});
}


main();