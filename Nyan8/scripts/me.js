//tokenから取得する
const nyanAcceptedParams = {
    client_id: 1111,
    client_secret: "dummy",
    access_token: "dummy"
};
const nyanOutputColumns = [
    "id",
    "role",
];

function main() {
    nyanRequestCheck(["client_id" , "client_secret" , "access_token"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    const sendData = {
        api: "me",
        client_id: nyanAllParams.client_id,
        client_secret: nyanAllParams.client_secret,
        access_token: nyanAllParams.access_token
    }
    return sendQL(sendData);
}

main();