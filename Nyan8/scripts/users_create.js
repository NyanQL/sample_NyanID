// ./scripts/users_create.js
// 新規ユーザー登録を行うスタブ実装

const nyanAcceptedParams = {
    username: "string",  // ユーザー名
    email:    "string",  // メールアドレス
};
const nyanOutputColumns = [
];

function main() {
    nyanRequestCheck(["username", "email", "client_id", "client_secret", "access_token"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }
    return sendQL(nyanAllParams);
}

main();