function main(){

    //access_tokenからupdated_byを取得
    const token = nyanRunSQL("./sql/access_token_by_token.sql" , nyanAllParams);
    console.log(token[0].user_id);

    //userの取得
    let user = nyanRunSQL("./sql/users_get_all.sql", { "id": nyanAllParams.id });
    if(! user){
        nyanErros.id = 'This user not found';
        return JSON.stringify({success: false, status: 401, error: nyanErros});
    }
    console.log(user[0]);


    //パスワードのハッシュ化変更処理
    let password = sha256( user[0].salt + nyanAllParams.password + "_" + apiPasswordHash);

    const updateData = {
        id: nyanAllParams.id,
        password: password,
        updated_by: token[0].user_id
    }
    nyanRunSQL("./sql/users_update_password.sql" , updateData);
    return JSON.stringify({ success: true, status: 200, result: { status: true } });
}

main();