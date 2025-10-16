const nyanAcceptedParams = {
    client_id: 1,
    client_secret: "dummy_secret",
    access_token: "dummy_access_token"
};

function check(){
    console.log(nyanAllParams);
    //tokenCheck();
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    return JSON.stringify({success: true, status: 200});
}
//check();
JSON.stringify({success: true, status: 200});