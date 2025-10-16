/*
* validation用のjavascriptです。
* ブラウザ側で使うことを想定しています。
* */

async function collectInputValues(lists) {
    const data = {};

    lists.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            const value = element.value
                .trim()                   // 前後の半角スペース除去
                .replace(/\u3000/g, '')    // 全角スペース除去
                .replace(/[\r\n]/g, '');   // 改行文字除去
            data[field.id] = value;
        } else {
            console.warn(`ID "${field.id}" が見つかりませんでした`);
        }
    });

    return data;
}


//タグが含まれていないことを確認
async function validateNoHtmlTags(lists) {
    const errors = [];
    const htmlTagPattern = /<[^>]*>/g;

    lists.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element) {
            errors.push(`ID "${field.id}" が存在しません。`);
            return;
        }
        const value = element.value.trim();

        const label = field.label || field.id;

        if (htmlTagPattern.test(value)) {
            errors.push(`「${label}」にHTMLタグが含まれている可能性があります。`);
        }
    });

    return errors;
}

//必須項目確認
async function validateRequiredFields(lists) {
    const errors = [];

    lists.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element) {
            errors.push(`ID "${field.id}" が存在しません。`);
            return;
        }
        const value = element.value.trim().replace(/\u3000/g, '');

        const label = field.label || field.id;

        if (value === "") {
            errors.push(`「${label}」は入力必須です。`);
        }
    });

    return errors;
}

async function checkEmail(name, value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = value || '';
    if (!emailRegex.test(email.trim())) {
        console.log(name + "NG");
        return name + "はメールアドレスの形式で入力してください。";
    }
    return "";
}
