console.log("clients_list.js")

//html
const htmlText = '<table><thead><th>ID</th><th>名前</th><th>詳細</th></thead>' +
    '<tbody data-nyanLoop="result">' +
    '<tr>' +
    '<td data-nyanString="id">ID</td>' +
    '<td data-nyanString="name">名前</td>' +
    '<td><a data-nyanHref="url">詳細</a></td>' +
    '</tr>' +
    '</tbody>' +
    '</table>';

//一覧の取得
async function getList(){
    await  refreshToken();
    postNyan8JSON({
        api: "clients_list"
    }).then(function (result){
        createClientsList(result);
        document.getElementById("clientsData").innerHTML = nyanPlate(result, htmlText);
    }).catch(function(result){
        console.log(result);
    });
}

/**
 * 一覧表の表示
 * @param response
 */
function createClientsList(response)
{
    response.result = response.result.map(client => ({
        ...client,
        url: `/client?detail=${client.id}`
    }));
    document.getElementById("clientsData").innerHTML = nyanPlate(response, htmlText);
}

/**
 * 処理の実行
 */
window.onload = function (){
    getList();
};


