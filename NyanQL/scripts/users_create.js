

function main() {
    //tokenの取得
    const token = nyanRunSQL("./sql/access_token_by_token.sql" , nyanAllParams);
    console.log(token[0].user_id);

    let insertData = nyanAllParams;
    insertData.salt = sha1(Math.random());
    insertData.created_by = token[0].user_id;
    //パスワードを仮作成
    insertData.password = sha256( insertData.salt + Math.random() + "_" + apiPasswordHash);
    let newId = nyanRunSQL("./sql/users_create.sql", insertData);
    if(! newId){
        return JSON.stringify({ success: false, status: 500, error: "Failed to create user" });
    }
    console.log(newId[0].id);

    //利用可能サービスの登録
    const data = nyanAllParams.user_client;
    data.forEach(item => {
        const { client_id, role_id} = item;

        // SQL 実行例: user_clients に INSERT
        nyanRunSQL("./sql/user_clients_insert.sql", {
            user_id:    newId[0].id,
            client_id:  client_id,
            role_id:    role_id,
            created_by: token[0].user_id,
            updated_by: token[0].user_id
        });
    });

    return JSON.stringify({ success: true, status: 200, result: { status: true } });

}

main();