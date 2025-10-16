// ./scripts/clients_create.js
// 新規サービスを登録し、生成されたIDを返します。

const nyanAcceptedParams = {
    name:        "string",   // サービス名
    redirect_uri: "string",   // リダイレクトURI
    secret:      "string",   // サービスシークレット（省略可）
};
const nyanOutputColumns = [
    "id"      // 新規作成されたサービスID
];

function main() {
    nyanRequestCheck(["name" , "redirect_uri", "secret" , "client_id", "client_secret", "access_token"]);
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
