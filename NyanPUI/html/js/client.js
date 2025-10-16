console.log("client.js")

//html
let htmlText = '<table><tr>\n' +
    '                       <th>ID</th>\n' +
    '                       <td data-nyanString="id"></td>\n' +
    '                   </tr>\n' +
    '                   <tr>\n' +
    '                       <th>名前<span class="red">*</span></th>\n' +
    '                       <td><input type="text" class="w_100" id="name" name="name" data-nyanValue="name" required></td>\n' +
    '                   </tr>\n' +
    '                   <tr>\n' +
    '                       <th>URL<span class="red">*</span></th>\n' +
    '                       <td><input type="text" class="w_100" id="redirect_uri" name="redirect_uri" data-nyanValue="redirect_uri" required></td>\n' +
    '                   </tr>\n' +
    '                   <tr>\n' +
    '                       <th>秘密キー<span class="red">*</span></th>\n' +
    '                       <td><input type="text" class="w_50" id="secret" name="secret" data-nyanValue="secret" required></td>\n' +
    '                   </tr>\n' +
    '               </table>';
let id = 0;

const requiredList = [
    { id: "name", label: "名前" },
    { id: "redirect_uri", label: "リダイレクトURI" },
    { id: "secret", label: "秘密キー" }
];

async function get_data(){
    try {
        // 現在のURLからクエリパラメータを取る
        const params = new URLSearchParams(window.location.search);
        // "detail" パラメータの値を取得
        id = params.get('detail');
        //id:1のclientの情報を取得する
        const requestData = {
            api: "client_get",
            id: id
        };
        await refreshToken();

        postNyan8JSON(requestData).then((result) => {
            let detail = result.result[0];
            console.log(detail);
            let viewHtml = nyanPlate(detail, htmlText);
            document.getElementById("clientData").innerHTML = viewHtml;
        }).catch((result) => {
            console.log("NG");
        });

    } catch (error){
        console.error("エラー発生:", error);
    }
}

/**
 * formの表示
 */
window.onload = function (){
    //詳細の取得と表示
    get_data();
};

/**
 * 内容を確認し、更新処理を実行する
 */
async function client_edit()
{
    document.getElementById("result_message").innerHTML = '';

    //必須チェック(1文字以上）
    const validationErrors = await validateRequiredFields(requiredList);
    if (validationErrors.length > 0) {
        console.error("入力エラー:", validationErrors);
        alert(validationErrors.join("\n"));
        return ;
    }
    console.log("必須チェックOK");
    const htmlValidationErrors = await validateNoHtmlTags(requiredList);
    if (htmlValidationErrors.length > 0) {
        console.error("入力エラー:", validationErrors);
        alert(validationErrors.join("\n"));
        return ;
    }
    console.log("HTMLのタグ混入チェックOK");

    let requestData = await collectInputValues(requiredList);
    requestData.api = "client_update";
    requestData.id = id;
    console.log("送信内容確認");
    console.log(requestData);
    //送信 //すでにaccess_tokenはあるの。
    //更新実行
    postNyan8JSON(requestData).then((result)=>{
        console.log(result.success);
        document.getElementById("result_message").innerHTML = '<b class="green">更新登録を完了しました。</b>';
        //登録完了のお知らせをする
    }).catch((result)=>{
        //エラー発生
        console.error(result.success);
    }).finally(()=>{
        console.log("更新処理完了");
    });
}

/**
 * 確認アラートを表示し、削除処理を実行する
 */
function client_delete()
{
    if (confirm("本当に削除しますか？")) {
        console.log("OKが押されました");
        const requestData = {
            api: "client_delete",
            id: id
        };
        postNyan8JSON(requestData).then((result)=>{
            console.log("OK");
            //一覧へ移動
            alert("削除を完了しました。");
            location.href = "/clients";
        }).catch((result)=>{
            document.getElementById("result_message").innerHTML = '<b class="red">削除に失敗しました。</b>';
        })
    } else {
        console.log("キャンセルされました");
    }
}
