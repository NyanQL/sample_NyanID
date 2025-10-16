const nyanAcceptedParams = {
    id: 1 ,   // 取得対象のユーザーID
    client_id: 1,
    client_secret: "dummy_secret",
    access_token: "dummy_access_token"
};
const nyanOutputColumns = [
    "id",         // ユーザーID
    "username",   // ユーザー名
    "email",      // メールアドレス
];


function main(){
    nyanRequestCheck(["id", "client_id", "client_secret", "access_token"]);
    tokenCheck();
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    //存在しなければエラー
    const user = nyanRunSQL("./sql/users_get.sql", nyanAllParams);
    if(!user){
        nyanErros.id = "This user is not found.";
        return JSON.stringify({
            success: false,
            status: 404,
            errors: nyanErros
        });
    }

    return JSON.stringify({success: true, status: 200});
}


main();