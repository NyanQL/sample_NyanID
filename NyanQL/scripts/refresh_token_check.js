function check(){

    nyanRequestCheck(["client_id", "client_secret" , "refresh_token"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    //tokenの確認
    const now = Math.floor(Date.now() / 1000)
    const access_token = nyanAllParams.refresh_token
    const parts = access_token.split('.')
    if (parts[0] < now) {
        nyanErros.refresh_token = 'Token expired.'
        return //期限切れなら以降のチェックはしない
    }

    if (parts[1] !== refreshToken_prefix) {
        nyanErros.refresh_token = 'Token prefix invalid.'
        return //prefix違いなら以降のチェックはしない
    }

    return JSON.stringify({ success: true, status: 200 });
}

check();