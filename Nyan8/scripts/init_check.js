//init_check.js
const nyanAcceptedParams = {
};
const nyanOutputColumns = [
    "complete" //bool
];
function main(){

    const requestData = {
        api: "init_check"
    };
    const result =  sendQL(requestData);
    console.log(result);
    return result;
}


main();