const nyanAcceptedParams = {
    client_id: 1,
    client_secret: "dummy_secret",
    access_token: "dummy_access_token"
};
const nyanOutputColumns = [];

function main() {

    nyanRequestCheck(["client_id", "client_secret", "access_token"]);

    return sendQL({
        api: "clients_list",
        client_id: nyanAllParams.client_id,
        client_secret: nyanAllParams.client_secret,
        access_token: nyanAllParams.access_token
    });
}

main();
