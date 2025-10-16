// ./scripts/users_get.js
// 指定されたユーザーIDの詳細情報を取得するスタブ実装

const nyanAcceptedParams = {
    id: 1 ,   // 取得対象のユーザーID
    client_id: 1,
    client_secret: "dummy_secret",
    access_token: "dummy_access_token"
};
const nyanOutputColumns = [
    "id",         // ユーザーID
    "username",   // ユーザー名
    "email",      // メールアドレス
    "role"        // 割り当てられたロール
];

function main() {

    nyanRequestCheck(["id", "client_id", "client_secret", "access_token"]);
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