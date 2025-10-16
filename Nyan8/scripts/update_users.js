function main() {
    nyanRequestCheck(["since"]);
    if (Object.keys(nyanErros).length > 0) {
        return JSON.stringify({
            success: false,
            status: 401,
            errors: nyanErros
        });
    }

    const sendData = {
        api: "update_users",
        since: nyanAllParams.since
    }
    return sendQL(sendData);
}

main();