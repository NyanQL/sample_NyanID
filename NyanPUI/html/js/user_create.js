console.log("loaded user.js");
let id = 0;
const userDataHtml = '<table>\n' +
    '                <tbody>\n' +
    '                <tr>\n' +
    '                    <th>名前(ログイン時に使用） <span class="red">*</span></th>\n' +
    '                    <td><input type="text" name="username" id="username" data-nyanValue="username" required></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <th>メールアドレス <span class="red">*</span></th>\n' +
    '                    <td><input type="email" name="email" id="email" data-nyanValue="email" required></td>\n' +
    '                </tr>\n' +
    '                </tbody>\n' +
    '            </table>';

const clientHtml = '<table>\n' +
    '                <thead>\n' +
    '                <tr>\n' +
    '                    <th class="left" style="width:80px;;">利用可能</th>\n' +
    '                    <th class="left" style="width:50px;">ID</th>\n' +
    '                    <th>client名</th>\n' +
    '                    <th style="width:100px;">role</th>\n' +
    '                </tr>\n' +
    '                </thead>\n' +
    '                <tbody data-nyanLoop="result">\n' +
    '                <tr>\n' +
    '                    <td class="center"><input type="checkbox" ' +
    'data-nyanValue="id" ' +
    'name="client_ids"></td>\n' +
    '                    <td data-nyanString="id"></td>\n' +
    '                    <td data-nyanString="name"></td>\n' +
    '                    <td><select data-nyanLoop="roles" data-nyanName="post_name">' +
    '<option ' +
    'data-nyanString="name" ' +
    'data-nyanValue="id" ></option></select></td>\n' +
    '                </tr>\n' +
    '                </tbody>\n' +
    '            </table>';

//一旦codeで指定
const roles = [
    {id: 1, name: '管理者'},
    {id: 2, name: '利用者'},
    {id: 3, name: 'ゲスト'}
];

const requiredList = [
    {id: "email", label: "メールアドレス"},
    {id: "username", label: "名前(ログイン時に使用）"},
];

/**
 * 一覧表の表示
 * @param response
 */
async function showClientData(result) {
    console.log(JSON.stringify(result));
    let clients = [];
    result.result.forEach(item => {
        item.roles = roles;
        item.post_name = "add_role_ids[" + item.id + "]";
        clients.push(item)
    });
    result.result = clients;
    document.getElementById("userClientData").innerHTML = nyanPlate(result, clientHtml);
}

/**
 * サービス一覧の表示
 * @returns {Promise<void>}
 */
async function showClients() {
    postNyan8JSON({
        api: "clients_list",
    }).then((result) => {
        showClientData(result);
    }).catch((result) => {
        console.error(JSON.stringify(result));
    });

}

async function showItems()
{
    await refreshToken();
    await showClients();

    document.getElementById("usersData").innerHTML = userDataHtml;
}

window.onload = function(){
    showItems();
}

async function create() {

        console.log("start");
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
        //必須項目の確認
        //htmlタグの混入確認
    let errors = await validateRequiredFields(requiredList);
    console.log(JSON.stringify(errors));
    if (errors.length > 0) {
        //alert(req_errors.join("\n"));
        document.getElementById("user_message").innerHTML = '<div class="red">エラーが発生しました<br>' + errors.join("<br>") + '</div>';
        return;
    }

    errors = await validateNoHtmlTags(requiredList);
    if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        document.getElementById("user_message").innerHTML = '<div class="red">エラーが発生しました<br>' + errors.join("<br>") + '</div>';
        return;
    }

    if (await checkEmail("メールアドレス", email)) {
        document.getElementById("user_message").innerHTML = '<div class="red">エラーが発生しました<br>' + checkEmail("メールアドレス", email) + '</div>';
        return;
    }

    const checkedValues = Array.from(document.querySelectorAll('input[name="client_ids"]:checked'))
        .map(input => Number(input.value));
    console.log(JSON.stringify(checkedValues));

    const selectedRoles = {};
    document.querySelectorAll('select[name^="add_role_ids["]').forEach(select => {
        const name = select.name; // 例: "add_role_ids[1]"

        // client_id を抜き出す
        const match = name.match(/^add_role_ids\[(\d+)\]$/);
        if (match) {
            const clientId = match[1];
            selectedRoles[clientId] = select.value;
        }
    });

    //数値確認
    const check = await validateIntegerData(checkedValues, selectedRoles);
    if (check) {
        console.log("すべて整数です。");
    } else {
        console.log("整数でないデータがあります。");
        document.getElementById("client_message").innerHTML = '<div class="red">エラーが発生しました</div>';
        return ;
    }

    const user_clients_data = await buildRoleAssignments(checkedValues, selectedRoles);

    const requestData = {
        api: "users_create",
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        user_client: user_clients_data
    };
    console.log(JSON.stringify( requestData));

    if (confirm("新規作成しますか?")) {
        postNyan8JSON(requestData).then((result)=>{
            alert("登録完了しました。一覧に戻ります。");
            location.href="/users";
        }).catch(()=>{
            alert("登録に失敗しました。");
        });
    }
}

/**
 * 整数値チェック 2つの配列の中身が整数値であることを確認します。
 * @param checkedValues
 * @param selectedRoles
 * @returns {*|false|this is [string, unknown][]}
 */
async function validateIntegerData(checkedValues, selectedRoles) {
    // checkedValues: 配列内のすべてが整数か
    const allCheckedInts = Array.isArray(checkedValues) && checkedValues.every(val =>
        Number.isInteger(Number(val))
    );

    // selectedRoles: キーも値もすべて整数か
    const allSelectedInts = selectedRoles &&
        typeof selectedRoles === 'object' &&
        Object.entries(selectedRoles).every(([key, value]) =>
            Number.isInteger(Number(key)) && Number.isInteger(Number(value))
        );

    return allCheckedInts && allSelectedInts;
}

/**
 * checkedValuesとselectedRolesから送信する値を作成する
 * @param checkedValues
 * @param selectedRoles
 * @param user_id
 * @returns {*}
 */
async function buildRoleAssignments(checkedValues, selectedRoles) {
    return checkedValues
        .filter(clientId => selectedRoles.hasOwnProperty(clientId))
        .map(clientId => ({
            client_id: clientId,
            role_id: selectedRoles[clientId]
        }));
}
