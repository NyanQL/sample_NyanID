const nyanAcceptedParams = {
    username: "nyan",
    password: "nyanPassword",
    client_id: 1,
    client_secret: "dummy_secret"
};
const nyanOutputColumns =  [
    "token",
    "refreshToken",  // リフレッシュトークン
    "expiresIn"
];

function main() {
    return sendQL({
        api: "users_login" ,
        username: nyanAllParams.username ,
        password: nyanAllParams.password,
        client_id: nyanAllParams.client_id,
        client_secret: nyanAllParams.client_secret
    });
}

main();