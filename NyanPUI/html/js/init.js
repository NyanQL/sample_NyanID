
window.onload = function (){
    document.getElementById("submit_button").className = "mt_32";
}

const requiredList = [
    { id: "email", label: "メールアドレス" },
    { id: "username", label: "ユーザー名前(ログイン時に使用）" },
    { id: "password", label: "パスワード" },
];

const tagCheckList = [
    { id: "email", label: "メールアドレス" },
    { id: "username", label: "ユーザー名前(ログイン時に使用）" }
];

async function create(){
    document.getElementById("submit_button").className = "hidden";
    const username = await document.getElementById("username").value;
    const password = await document.getElementById("password").value;
    const email = await document.getElementById("email").value;

    let errors = await validateRequiredFields(requiredList);
    if(await validateNoHtmlTags(tagCheckList)){
        errors.concat(await validateNoHtmlTags(tagCheckList));
    }

    if(! isValidPassword(password)){
        errors.push("「パスワード」は8文字以上の半角英数字で大文字小文字を含む必要があります。");
    }
    const emailErrorText = await checkEmail("「メールアドレス」", email);
    if (emailErrorText) {
        errors.push(emailErrorText);
    }

    if(errors.length > 0)
    {
        await showError(errors.join("\n"));
        return ;
    }

    if(confirm("送信しますか？")){
        document.getElementById("submit_button").className = "hidden";

        postNyan8JSON({
            api: "setup",
            username: username,
            password: password,
            email: email
        }).then((result)=>{
            alert("登録を完了しました。登録した内容でログインください");
            location.href = "/login";
            return ;
        }).catch(()=>{
            showError("登録に失敗しました。");
        });
    }
}


async function showError(errorText)
{
    alert(errorText);
    document.getElementById("message").innerHTML = '<div class="red">ERROR: <br>' + errorText.replace(/\n/g, '<br>') + '</div>';
    document.getElementById("submit_button").className = "mt_32";
    return ;
}


function isValidPassword(str) {
    return /^[A-Za-z0-9]{8,}$/.test(str) && /[A-Z]/.test(str);
}


//必須チェック
//パスワードチェック(８文字以上)
//送信中のボタン利用不可多重送信禁止
//成功したらその旨をalertで表示し、ログイン画面へ遷移させる。
//失敗した場合には失敗した旨を赤字で表示する。
