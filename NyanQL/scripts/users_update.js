// パスワード以外を更新
function main() {

    //tokenからupdated_byを取得
    const token = nyanRunSQL("./sql/access_token_by_token.sql" , nyanAllParams);
    console.log(token[0].user_id);
    //更新方法を確認
    const updateData = {
        id: nyanAllParams.id,
        username: nyanAllParams.username,
        email: nyanAllParams.email,
        updated_by: token[0].user_id
    };

    //userのupdate
    nyanRunSQL("./sql/users_update.sql" , updateData);

    //clientから該当のゆーざの情報を削除する。
    nyanRunSQL("./sql/user_clients_delete_user_id.sql", {user_id: nyanAllParams.id});
    const data = nyanAllParams.user_client;
    data.forEach(item => {
        const { user_id, client_id, role_id} = item;

        // SQL 実行例: user_clients に INSERT
        nyanRunSQL("./sql/user_clients_insert.sql", {
            user_id:    user_id,
            client_id:  client_id,
            role_id:    role_id,
            created_by: token[0].user_id,
            updated_by: token[0].user_id
        });
    });

    return JSON.stringify({ success: true, status: 200, result: { status: true } });
}

main();
