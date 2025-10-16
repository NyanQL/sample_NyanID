const nyanAcceptedParams = {
    "client_id" : 1,
    "client_secret": "dummy",
    "username": "dummy_username"
};
const nyanOutputColumns = [
    "status"      // リセット結果
];

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

function main() {
    nyanRequestCheck(["client_id" , "client_secret", "username"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    //アカウントの特定
    const userRequestData = {
        api: "user_by_username_or_email",
        username: nyanAllParams.username
    };
    const user = sendQL(userRequestData);
    console.log(user);
    if(! user)
    {
        return JSON.stringify({
            success: false,
            status: 404,
            errors: "not found."
        });
    }
    const userData = JSON.parse(user);
    //パスワードの生成
    const password = generateRandomString();

    const requestData = {
        api: "password_reset",
        id: userData.result[0].id,
        password: password,
        client_id: nyanAllParams.client_id,
        client_secret: nyanAllParams.client_secret
    };

    const updateResult = sendQL(requestData);
    if (! updateResult){
        return JSON.stringify({
            success: false,
            status: 500,
            errors: "update error"
        });
    }
    const updateResultData = JSON.parse(updateResult);
    if(updateResultData.success == false){
        return JSON.stringify({
            success: false,
            status: 500,
            errors: "update error"
        });
    }

    //更新成功
    const mail_text = userData.result[0].username +  "様 \n\nパスワードが発行されました。\n パスワード:" + password + "\n" + mailFooter;

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