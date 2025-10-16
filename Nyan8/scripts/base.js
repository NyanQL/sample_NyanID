const nyanQlUrl = {
    url: "http://localhost:8103/",
    user: "neko",
    pass: "nyan",
}


//QLにリクエストを送る
function sendQL (data) {
    console.log(data);
    return nyanJsonAPI(nyanQlUrl.url , JSON.stringify(data), nyanQlUrl.user, nyanQlUrl.pass);
}