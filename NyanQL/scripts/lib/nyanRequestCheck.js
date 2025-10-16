console.log("loaded nyanRequestCheck.js");
let nyanErros = {};

function nyanRequestCheck(keyArray = [], requiredParams = {}) {
    if (Object.keys(requiredParams).length == 0) {
        requiredParams = nyanAllParams;
    }
    if (keyArray.length == 0) {
        keyArray = nyanAcceptedParamsKeys;
    }
    // requiredParams 配列の各キーについて、requiredParams に存在するか確認
    keyArray.forEach(param => {
        if (!(param in requiredParams)) {
            nyanErros[param] = "Request does not exist";
        }
    });

// エラーがある場合はエラーオブジェクトを出力
    if (Object.keys(nyanErros).length > 0) {
        return nyanErros;
    } else {
        return;
    }
}

//Emailの形式チェック
function nyanRequestCheckEmail(name, value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = value || '';
    if (!emailRegex.test(email.trim())) {
        nyanErros[name] = "Invalid email format";
    }
}

//idにふさわしいか確認
function nyanIsID(name, value) {
    const num = Number(value);
    if (! Number.isFinite(num) && num >= 0){
        nyanErros[name] = "It is must be a positive number.";
        return false;
    }
    return true;
}
