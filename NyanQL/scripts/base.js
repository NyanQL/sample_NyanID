console.log("loaded base.js");
const refreshTokenExpires = 60 * 60 * 24 * 7; //7days

/**
 * パスワードチェック
 * 8文字以上記号禁止  大文字小文字の英数字
 * @param name
 * @param password
 */
function requestCheckPassword(name, password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const pwd = (password || '').trim();

    if (!regex.test(pwd)) {
        nyanErros[name] = "Password must be at least 8 characters and include uppercase letters, lowercase letters, and numbers.";
    }
}

/**
 * access token check
 */
function tokenCheck()
{
    console.log("== tokenCheck start =========");
    const clients = nyanRunSQL("./sql/clients_check.sql", nyanAllParams);
    console.log(clients);
    if(clients.length === 0)
    {
        nyanErros.client_id = "client not found";
    }
    const tokens = nyanRunSQL("./sql/access_token_by_token.sql" , nyanAllParams);
    console.log(tokens);
    if(tokens.length === 0){
        nyanErros.access_token = "token not found";
    }
    console.log("== tokenCheck end =========");
}