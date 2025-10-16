function main(){
    let footer = nyanGetFile("./templates/parts/footer.html");
    return nyanPlate({html_footer: footer});
}

main();