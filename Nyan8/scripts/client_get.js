// ./scripts/clients_get.js
// 指定されたサービスIDの詳細情報を取得します。

const nyanAcceptedParams = {
    id: "number"  // 取得対象のサービスID
};
const nyanOutputColumns = [
    "id",         // サービスID
    "name",       // サービス名
    "redirectUri",// リダイレクトURI
    "secret",     // サービスシークレット
    "scopes"      // スコープ配列
];

function main() {
    nyanRequestCheck(["id" , "client_id" , "client_secret", "access_token"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    nyanIsID('id' , nyanAllParams);
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
