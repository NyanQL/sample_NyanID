function main(){
    console.log(nyanAllParams);
    const resultData = nyanRunSQL("./sql/me.sql", nyanAllParams);
    console.log(resultData);
    return JSON.stringify({success: true, status: 200, result : resultData});
}
main();


