function check(){

    nyanRequestCheck(["client_id", "client_secret" , "refresh_token"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    return JSON.stringify({ success: true, status: 200 });
}

check();