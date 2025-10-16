//init_check.js
const nyanAcceptedParams = {
    username: "dummy_username",
    password: "dummyPassword12345",
    email:"dummy@exsamble.com",
    client_id: 1,
    client_secret: "dummy_secret"
};
const nyanOutputColumns = [
    "complete"
];

function main(){
    nyanRequestCheck(["username" , "password", "email", "client_id", "client_secret"]);
    nyanRequestCheckEmail("email", nyanAllParams.email);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            error: nyanErros
        });
    }
    return sendQL(nyanAllParams);
}

main();