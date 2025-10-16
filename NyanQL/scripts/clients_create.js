function main() {

    //cleated_byを取得する
    const token = nyanRunSQL("./sql/access_token_by_token.sql" , nyanAllParams);
    let insertData = nyanAllParams;
    insertData.created_by = token[0].user_id;
    nyanRunSQL("./sql/clients_create.sql" , insertData)

    // 正常レスポンス
    return JSON.stringify({
        success: true,
        status: 200
    });
}

main();
