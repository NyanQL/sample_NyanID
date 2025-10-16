console.log("loaded user.js");
let id = 0;
const userDataHtml = '<table>\n' +
    '                <tbody data-nyanLoop="result">\n' +
    '                <tr>\n' +
    '                    <th>ID</th>\n' +
    '                    <td data-nyanString="id"></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <th>名前(ログイン時に使用） <span class="red">*</span></th>\n' +
    '                    <td><input type="text" name="username" id="username" data-nyanValue="username" required></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <th>メールアドレス <span class="red">*</span></th>\n' +
    '                    <td><input type="text" name="email" id="email" data-nyanValue="email" required></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <th>新規作成日</th>\n' +
    '                    <td data-nyanString="created_at"></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <th>最終更新日</th>\n' +
    '                    <td data-nyanString="updated_at"></td>\n' +
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
                                'data-nyanValue="client_id" ' +
                                'data-nyanId="post_client_id" ' +
                                'name="client_ids" '  +
                                'data-nyanChecked="assigned"></td>\n' +
    '                    <td data-nyanString="client_id"></td>\n' +
    '                    <td data-nyanString="client_name"></td>\n' +
    '                    <td><select data-nyanLoop="role" data-nyanName="post_name">' +
                            '<option ' +
                                'data-nyanString="name" ' +
                                'data-nyanValue="id" ' +
                                'data-nyanSelected="selected"></option></select></td>\n' +
    '                </tr>\n' +
    '                </tbody>\n' +
    '            </table>';

//DBから取得する？
const roles = [
    {id: 1, name: '管理者'},
    {id: 2, name: '利用者'},
    {id: 3, name: 'ゲスト'}
];

const requiredList = [
    { id: "email", label: "メールアドレス" },
    { id: "username", label: "名前(ログイン時に使用）" },
];

let requestList = requiredList;


let userData ;

async function showDetail(){
    await refreshToken();
    await getId();
    let viewFlg = 0;
    //詳細取得
   await postNyan8JSON({
        api: "user_get",
        id: id
    }).then((result) => {
        //アカウント詳細
        if(result.success) {
            document.getElementById("usersData").innerHTML = nyanPlate(result, userDataHtml);
            viewFlg = 1;
            return 1;
        }
    }).catch((result) => {
        alert("指定されたアカウントは存在ません。");
        location.href = "/users";
        return ;
    }).finally(()=>{
    });

    await showClients();
}

/**
 * サービス一覧の表示
 * @returns {Promise<void>}
 */
async function showClients() {
    postNyan8JSON({
        api: "user_clients_list",
        id: id
    }).then((result) => {
        //アカウント詳細
        console.log("OK");
        //assignedをtrueに変換
        showClientData(result);
        //修正登録ボタンの表示
        document.getElementById("wrap_client_edit_button").className = "right";
    }).catch((result) => {
        console.error(JSON.stringify(result));
    });

}

/**
 * 一覧表の表示
 * @param response
 */
async function showClientData(response) {
    response.result = response.result.map(item => {
        item = {
            ...item,
            assigned: item.assigned === 1,
            post_client_id: "add_client_ids[" + item.client_id + "]",
            post_name: "add_role_ids[" + item.client_id + "]"
        };

        let roleOptions = roles.map(role => ({
            ...role,
            selected: item.role_id != null && role.id === item.role_id,
        }));

        requestList.push({
            id: item.post_client_id,
            name: "利用可能サービス 登録"
        });
        item.role = roleOptions;
        return item;
    });

    document.getElementById("userClientData").innerHTML = await nyanPlate(response, clientHtml);
}


async function getId() {
    // 現在のURLからクエリパラメータを取る
    const params = new URLSearchParams(window.location.search);
    // "detail" パラメータの値を取得
    id = params.get('detail');
    if(! id ){
        alert("アカウントが指定されていません。");
        location.href = "/users"
    }
}

async function edit() {

    const req_errors = await validateRequiredFields(requiredList);
    if (req_errors.length > 0) {
       //alert(req_errors.join("\n"));
        document.getElementById("user_message").innerHTML = '<div class="red">エラーが発生しました<br>' + req_errors.join("<br>") +'</div>';
       return ;
    }
    const html_errors = await validateNoHtmlTags(requestList);
    if (html_errors.length > 0) {
        //alert(req_errors.join("\n"));
        document.getElementById("user_message").innerHTML = '<div class="red">エラーが発生しました<br>' + html_errors.join("<br>") +'</div>';
        return ;
    }

    //チェックがされている値を配列にする。
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

    const user_clients_data = await buildRoleAssignments(checkedValues, selectedRoles, id);

    const requestData = {
        api: "users_update",
        id: id,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        user_client: user_clients_data
    };

    console.log(JSON.stringify(requestData));
    postNyan8JSON(requestData).then((result)=>{
        if(result.success){
            document.getElementById("user_message").innerHTML = '<div class="green">更新を完了しました。</div>';
        }
    }).catch((result)=>{
        consule.log(JSON.stringify(result));
        alert("更新に失敗しました");
    }).finally((result)=>{

    });
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
async function buildRoleAssignments(checkedValues, selectedRoles, user_id) {
    return checkedValues
        .filter(clientId => selectedRoles.hasOwnProperty(clientId))
        .map(clientId => ({
            role_id: selectedRoles[clientId],
            user_id: user_id,
            client_id: clientId
        }));
}

async function user_delete()
{
    await getId();
    //id取得前ならしょりなし
    if(! id) { return ; }
    if(confirm("本当に削除しますか？")){
        const requestData = {
            api: "users_delete",
            id: id
        };
        postNyan8JSON(requestData).then((result)=>{
            alert("削除しました。一覧に戻ります。");
            location.href = "/users";
        }).catch(()=>{
            console.error("削除失敗");
                alert("削除登録に失敗しました。");
        });
    }
}

//パスワードの発行
async function password_create()
{
    document.getElementById("wrap_password_create").className = "hidden"; //right mb_32
    if(confirm("送信しますか？")){
        postNyan8JSON({
            api: "users_password_update",
            id: id
        }).then((result)=>{
            alert("パスワード生成に成功しました。");
            document.getElementById("wrap_password_create").className = "right mb_32";
        }).catch(()=>{
            alert("パスワード生成に失敗しました。");
            document.getElementById("wrap_password_create").className = "right mb_32";
        });
    }
}


window.onload = function ()
{
    showDetail();
}
