const finished_html = nyanGetFile("./templates/init_finished.html");
const setting_html = nyanGetFile("./templates/init.html");

function main(){

    const result = nyanJsonAPI(nyan8Url, JSON.stringify({api: "init_check"}));
    const checkData = JSON.parse(result);
    console.log(checkData.result.complete );
    if(checkData.result.complete === true){
        return finished_html;
    } else {
        const config = nyanGetFile("../NyanQL/config.json");
        const nyanQL = JSON.parse(config);
        let message = "";
        if(nyanQL.BasicAuth.Username == "neko" && nyanQL.BasicAuth.Password == "nyan"){
            message = "<b>Warning:</b> BasicAuthの設定を変更してください。<br> 変更するファイルは NyanQL/config.json です。<br> Nyan8/scripts/base.js も同じ値になるように変更してください。";
        }
        return nyanPlate({ message: message}, setting_html);
    }

}


main();