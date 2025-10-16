// clients_update 実行

function main() {
    //updated_atの確認 すでにtokenのチェックはされているので確実に情報はある。
    //取得できなかった場合は例外が発行される。
    const token = nyanRunSQL("./sql/access_token_by_token.sql" , nyanAllParams);
    //更新方法を確認
    const updateData = {
        id: nyanAllParams.id,
        name: nyanAllParams.name,
        secret: nyanAllParams.secret,
        redirect_uri: nyanAllParams.redirect_uri,
        updated_by: token[0].user_id
    };
    //console.log(updateData);

    nyanRunSQL("./sql/clients_update.sql" , updateData);

    return JSON.stringify({
        success: true,
        status: 200
    });
}

main();
