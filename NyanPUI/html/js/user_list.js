console.log("loaded account_list.js");
const htmlText = '<table>\n' +
    '                <thead>\n' +
    '                    <th>ID</th>\n' +
    '                    <th>username</th>\n' +
    '                    <th>詳細</th>\n' +
    '                </thead>\n' +
    '                <tbody data-nyanLoop="result"><tr>\n' +
    '                    <td data-nyanString="id"></td>\n' +
    '                    <td data-nyanString="username"></td>\n' +
    '                    <td><a data-nyanHref="url">詳細</a></td>\n' +
    '                </tr></tbody>\n' +
    '            </table>';

window.onload = function () {
    showLists();
}

//一覧の取得と表示
async function showLists(){
    await refreshToken();
    postNyan8JSON({api: "users_list"}).then((result)=>{
        createList(result);
        return;
    }).catch((result)=>{
        console.log(result);
        document.getElementById("usersData").innerHTML = "";
        return ;
    });
}

/**
 * 一覧表の表示
 * @param response
 */
async function createList(response)
{
    response.result = await response.result.map(users => ({
        ...users,
        url: `/user?detail=${users.id}`
    }));
    document.getElementById("usersData").innerHTML = await nyanPlate(response, htmlText);
}
