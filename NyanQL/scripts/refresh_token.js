function main(){

    //期限切れtokenの削除
    nyanRunSQL("./sql/access_token_clear.sql");
    nyanRunSQL("./sql/refresh_tokens_clear.sql");

    //refresh_tokenの取得
    const refresh_tokens = nyanRunSQL("./sql/refresh_tokens_by_token.sql" , nyanAllParams);
    console.log(refresh_tokens);

    const insertData = {
        user_id: refresh_tokens[0].user_id,
        client_id: nyanAllParams.client_id,
        token      : sha256(Math.random() + refresh_tokens[0].user_id + Math.floor(Date.now() / 1000)),
        expires_at : Math.floor(Date.now() / 1000) + (60 * 60 * 1),
        created_by: refresh_tokens[0].user_id,
        updated_by:  refresh_tokens[0].user_id,
    }
    const r = nyanRunSQL("./sql/access_token_create.sql" , insertData);
    console.log(r);

    return JSON.stringify({
        success: true,
        status: 200,
        result: {
            access_token: r[0].token
        }
    });
}

main();