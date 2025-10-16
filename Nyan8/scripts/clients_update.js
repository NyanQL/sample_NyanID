// ./scripts/clients_update.js
// 既存サービス情報を更新する予定のJSONをサンプルとして返却するスタブ実装

const nyanAcceptedParams = {
    id: "number",   // 更新対象のサービスID
    name: "string",   // サービス名
    redirect_uri: "string",   // リダイレクトURI
    secret: "string",   // シークレット（オプション）
};
const nyanOutputColumns = [
];

function main() {
    //required
    nyanRequestCheck([
        "id",
        "name",
        "redirect_uri",
        "secret",
        "access_token",
        "client_id",
        "client_secret"
    ]);

    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    const requestData = nyanAllParams;
    return sendQL(requestData);
}

main();