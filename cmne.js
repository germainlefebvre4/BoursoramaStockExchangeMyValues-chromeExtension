/*
    Init variables
*/
/* Stock Exchange MyValues
        Values are retrieved from the trading platform.
*/
myValues = {}
stockExchangeNameMapping = {
    "BNP PARIBAS ACTIONS A": "BNP PARIBAS",
    "CASINO GUICHARD-PERRACHON": "CASINO GUICHARD PERRACHON",
    "CREDIT AGRICOLE": "CREDIT AGRICOLE SA",
    "JC DECAUX": "JCDECAUX SA.",
    "LA FRANCAISE DES JEUX FDJ": "FDJ",
    "M6 - METROPOLE TELEVISION": "M6 METROPOLE TELE.",
    "TOTAL SE": "TOTAL",
    "VEOLIA ENVIRONNEMENT": "VEOLIA"
}

stockTable = document.getElementById("tabValorisation");
stockRows = stockTable.getElementsByClassName("ligneMere")
for ( i=0 ; i<stockRows.length ; i++ ) {
    console.log(stockRows[i].children[0].children[0].textContent);
    console.log(stockRows[i].children[2].children[1].textContent);
    stockKey = stockRows[i].children[0].children[0].textContent;
    stockValue = stockRows[i].children[2].children[1].textContent;
    
    if (stockKey in stockExchangeNameMapping) {
        key = stockExchangeNameMapping[stockKey]
    } else {
        key = stockKey
    }
    myValues[key] = Number(stockValue.replace(",", "."));
}


chrome.storage.sync.set({
    stockExchange: myValues
}, function() {
    console.log("Stock Exchanged saved");
});
