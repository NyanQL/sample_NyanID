function main() {

    nyanRequestCheck(["refresh_token", "client_id", "client_secret"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            error: nyanErros
        });
    }

    const data = {
        api: "refresh_token",
        refresh_token: nyanAllParams.refresh_token,
        client_id: nyanAllParams.client_id,
        client_secret: nyanAllParams.client_secret
    };
    return  sendQL(data);
}

main();