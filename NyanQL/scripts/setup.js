function main(){

    let insertData = nyanAllParams;
    insertData.salt = sha1(Math.random());
    insertData.created_by = 1; //setupなので自身
    //パスワードを仮作成
    insertData.password = sha256( insertData.salt + nyanAllParams.password + "_" + apiPasswordHash);
    let newId = nyanRunSQL("./sql/users_create.sql", insertData);
    if(! newId) {
        return JSON.stringify({success: false, status: 500, error: "Failed to create user"});
    }

    nyanRunSQL("./sql/user_clients_insert.sql", {
        user_id:    newId[0].id,
        client_id:  nyanAllParams.client_id, //nyanID
        role_id:    1, //管理者
        created_by: insertData.created_by,
        updated_by: insertData.created_by
    });

    return JSON.stringify({ success: true, status: 200, result: { status: true } });
}

main();