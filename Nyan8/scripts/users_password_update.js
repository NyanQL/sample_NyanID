


//8文字のパスワードを自動生成する。
function generateRandomString(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}

function main(){

    nyanRequestCheck(["id", "client_id", "client_secret", "access_token"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }
    //idからユーザー情報の取得
    const requestUser ={
        api: "user_get",
        id: nyanAllParams.id,
        client_id: nyanAllParams.client_id,
        client_secret: nyanAllParams.client_secret,
        access_token: nyanAllParams.access_token
    };
    const user = sendQL(requestUser);
    const userData= JSON.parse(user);
    if(! userData.success)
    {
        nyanErros.id = "This account does not exist.";
        //該当のユーザーが存在しない。
        return JSON.stringify({
            success: false,
            status: 404,
            errors: nyanErros
        });
    }

    //パスワードの生成
    const password = generateRandomString();
    let requestData = nyanAllParams;
    //自動生成したパスワードを追加
    requestData.password = password;
    const result = sendQL(requestData);
    const data = JSON.parse(result);
    //失敗したらエラーを返す。
    if(! data.success)
    {
        return JSON.stringify({
            success: false,
            status: 500,
            errors: "Server ERROR."
        });
    }

    //成功していたらメール送信
    console.log(userData);
    const mail_text = userData.result[0].username +  "様 \n\nパスワードが発行されました。\n パスワード:" + password + "\n" + mailFooter;
    console.log(mail_text);
    console.log(userData.result[0].email);
    nyanSendMail({
      to: [userData.result[0].email],
      subject: "NyanID パスワードの発行",
      body: mail_text,
      html: false
    });

    //結果を返す
    return JSON.stringify({ success: true, status: 200, result: { status: true } });
}


main();