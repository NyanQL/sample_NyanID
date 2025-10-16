// ./scripts/clients_delete.js
// 指定されたサービスIDを受け取り、削除を行うスタブ実装

const nyanAcceptedParams = {
    id: 1,    // 削除対象のサービスID
    client_id: 1,
    access_token: "dummy"
};
const nyanOutputColumns = [
    "status"       // 削除結果
];

function main() {


    nyanRequestCheck(["id" , "client_id" , "access_token"]);

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
