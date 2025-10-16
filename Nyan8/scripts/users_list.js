// ./scripts/users_list.js
// ユーザー一覧をページング付きで取得するスタブ実装

const nyanAcceptedParams = {
};
const nyanOutputColumns = [
    "id",
    "name",
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

    return sendQL({api: "users_list"});
}

main();