console.log("client_create.js")

let id = 0;

const requiredList = [
    {id: "name", label: "名前"},
    {id: "redirect_uri", label: "リダイレクトURI"},
    {id: "secret", label: "秘密キー"}
];


window.onload = function () {
    //secret初期値をいれておく
    document.getElementById("secret").value = generateRandomString();
}

/**
 * 新規作成
 * @returns {Promise<void>}
 */
async function create() {
    await refreshToken();

    //必須チェック
    let errors = await validateRequiredFields(requiredList);
    if (errors.length > 0) {
        alert(errors.join("\n"));
        console.log()
        return;
    }
    errors = await validateNoHtmlTags(requiredList);
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    //入力情報を送信用に収集
    const requestData = await collectInputValues(requiredList);
    requestData.api = "client_create";

    if (confirm("新規登録を実行しますか。")) {
        postNyan8JSON(requestData).then((result) => {
            console.log(result.success);
            alert("新規登録を完了しました。");
            location.href = "/clients";
            return;
        }).catch((result) => {
            alert("登録に失敗しました。");
        });
    }
}

function generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}