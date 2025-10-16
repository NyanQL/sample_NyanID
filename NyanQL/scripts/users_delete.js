// パスワード以外を更新
function main() {

    nyanRunSQL("./sql/users_delete.sql", nyanAllParams);
    //user_clientの削除
    nyanRunSQL("./sql/user_clients_delete_user_id.sql", {user_id: nyanAllParams.id});
    //tokenの削除
    nyanRunSQL("./sql/access_token_delete_users.sql", {user_id: nyanAllParams.id});
    nyanRunSQL("./sql/refresh_tokens_by_user.sql", {user_id: nyanAllParams.id});

    return JSON.stringify({ success: true, status: 200 });
}

main();
