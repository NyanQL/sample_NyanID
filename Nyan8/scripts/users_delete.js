// ./scripts/users_delete.js
// 指定されたユーザーIDを受け取り、削除するスタブ実装

const nyanAcceptedParams = {
    id: 1
};
const nyanOutputColumns = [
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