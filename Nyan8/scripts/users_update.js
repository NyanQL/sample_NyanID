// ./scripts/users_update.js
// 既存ユーザー情報を更新するスタブ実装

const nyanAcceptedParams = {
    id:       "number",  // 更新対象のユーザーID
    username: "string",  // 更新後のユーザー名
    email:    "string",  // 更新後のメールアドレス
    user_client: [
        {
            role_id: 1,
            user_id: 1,
            client_id: 1
        }
    ]
};
const nyanOutputColumns = [
];

function main() {

    nyanRequestCheck(["id", "username" , "email", "user_client", "client_id", "client_secret", "access_token"]);
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