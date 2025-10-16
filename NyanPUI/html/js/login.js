function login() {
    let loginButton　= document.getElementById('loginButton');
    loginButton.disabled = true; // ボタンを無効化
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username.length === 0) {
        alert("ユーザー名を入力してください");
        return;
    }
    if (password.length === 0) {
        alert("パスワードを入力してください");
        return;
    }

    const data = {
        api: "auth_login",
        username: username,
        password: password
    };

    postNyan8JSON(data).then(function (response) {
        console.log("成功:", response.result.refresh_token.token);
        console.log(response.result.refresh_token.expires_at);
        const saveToken = {
            token: response.result.refresh_token.token,
            expires_at: response.result.refresh_token.expires_at,
            user_id: response.result.refresh_token.user_id
        };

        const expiresDate = new Date(saveToken.expires_at * 1000);
        const expiresStr = expiresDate.toUTCString();
        document.cookie = `${encodeURIComponent(refreshTokenName)}=${encodeURIComponent(JSON.stringify(saveToken))}; path=/; secure; samesite=strict; expires=${expiresStr}`;

        location.href = "/clients";
    }).catch(function (error) {
        console.error("エラー:", error.message);
        alert("ログインに失敗しました。");
        return ;
        // エラー時の処理ここに書ける
    }).finally(function () {
        loginButton.disabled = false;
    });
}


async function reset_password()
{
    const username = await document.getElementById('username').value;
    console.log(username);
    if(! username)
    {
        alert("ユーザー名もしくはメールアドレスを入力してください。");
        return ;
    }
    if(confirm("送信しますか？"))
    {
        const requestData = {
            api: "password_reset",
            username: username
        };
        postNyan8JSON(requestData).then((result)=>{
            alert("新しいパスワードをメールしました。ご確認ください。");
        }).catch(()=>{
            alert("送信に失敗しました。管理者へご連絡をお願いします。");
        });
    }
}