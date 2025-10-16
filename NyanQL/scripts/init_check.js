function main(){
    //初期設定済みかどうかなのでclient_idもなにもないリクエスト
    const countData = nyanRunSQL("./sql/users_count.sql");
    console.log(countData);
    if(! countData)
    {
        return JSON.stringify({
            success: false,
            status: 500,
            errors: "server error"
        });
    }

    if(countData[0].count > 0)
    {
        //設定済み　
        return JSON.stringify({ success: true, status: 200, result: { complete: true } });
    }
    const newText = nyanBase64Encode('const apiPasswordHash = "' +  sha256(Math.random() + Math.random()) + '";');
    nyanSaveFile(newText , "./scripts/config/apiPasswordHash.js");
    return JSON.stringify({ success: true, status: 200, result: { complete: false } });
}

main();
