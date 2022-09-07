//#region
let priceList = [];
let nameList = [];
let cardIndexList = [];
let coinsMoreInfoArr = [];
let nameListIndex = 0;
$("#about").hide();
$("#coinsCard").hide();
$("#liveGraphs").hide();
$("#spinner").show();
setTimeout(getCoinsList, 500)
//#endregion


// #region
/**
 * calling the coins list and data
 */
async function getCoinsList() {
    try {
        let coinsList = await getCoinsAsync("https://api.coingecko.com/api/v3/coins/list");
        showCoinList(coinsList);
    }
    catch {
        console.log(e.toString());
    }
};

/**
 * 
 * @param {*} coinsList - The coins list 
 * @returns - printing the coins on cards
 * 
 */
function showCoinList(coinsList) {
    $("#coinsCard").html("");
    if ($("#searchCoin").val().length == 0) {
        for (let i = 0; i <= 99; i++) {
            let coinSym = `'${coinsList[i].symbol}'`;
            let coinId = `'${coinsList[i].id}'`;
            $("#coinsCard").append(`
            <div id="card${i}" class="card">
            <div class="card-body">
            <div id="coinSymbol">${coinsList[i].symbol}</div>
            <div id="checkboxModal${i}" class="form-check form-switch">
            <input type="checkbox" id="checkbox${i}"  onclick="toggle(${i}, ${coinSym})" class="form-check-input" role="switch" data-bs-toggle="modal" data-bs-target="#myModal" >
            </div>
            <div id="coinName"> ${coinsList[i].name}</div>
            <button type="button" id="mInfoButton${i}" onclick="printCoinMoreInfo(${i}, ${coinId})" class="mI" data-bs-toggle="collapse" data-bs-target="#info${i}">More info</button>
            <div id="info${i}" class="collapse"> 
            <div id="spinnerMi" class=" spinner-border spinner-border-sm"></div>
            </div>
            </div>
            </div>
            `);
            // coin validation when coins toggle is on 
            let coinIndex = cardIndexList.findIndex((x) => x == i);
            if (coinIndex != -1) {
                $(`#card${i}`).css("background-color", "rgba(50, 50, 250, 0.60)");
                $(`#checkbox${i}`).prop("checked", true);
            }
        }
    }
    else {
        for (let i = 0; i <= 99; i++) {
            let coinSym = `'${coinsList[i].symbol}'`;
            let coinId = `'${coinsList[i].id}'`;
            if (coinsList[i].symbol.includes($("#searchCoin").val())) {
                $("#coinsCard").append(`
                <div id="card${i}" class="card">
                <div class="card-body">
                <div id="coinSymbol">${coinsList[i].symbol}</div>
                <div id="checkboxModal${i}" class="form-check form-switch">
                <input type="checkbox" id="checkbox${i}"  onclick="toggle(${i}, ${coinSym})" class="form-check-input" role="switch" data-bs-toggle="modal" data-bs-target="#myModal" >
                </div>
                <div id="coinName"> ${coinsList[i].name}</div>
                <button type="button" id="mInfoButton${i}" onclick="printCoinMoreInfo(${i}, ${coinId})" class="mI" data-bs-toggle="collapse" data-bs-target="#info${i}">More info</button>
                <div id="info${i}" class="collapse"> 
                <div id="spinnerMi" class=" spinner-border spinner-border-sm"></div>
                </div>
                </div>
                </div>
                `);
                // coin validation when coins toggle is on 
                let coinIndex = cardIndexList.findIndex((x) => x == i);
                if (coinIndex != -1) {
                    $(`#card${i}`).css("background-color", "rgba(50, 50, 250, 0.60)");
                    $(`#checkbox${i}`).prop("checked", true);
                }
            }
        }
        // validation for no result
        if ($("#coinsCard").text() == "") {
            $("#coinsCard").html(`
            <div id="noMatch">
            No items were found that include all of your search terms.
            </div>`
            );
        }
    }
    $("#spinner").hide();
    $("#coinsCard").show();
}

// function of the search on input
$("#searchCoin").on("input", async () => {
    getCoinsList();
})
// #endregion






// #region 
$("#homePage").on("click", () => {
    clearInterval(myFirstIntreval);
    clearInterval(mySecondInterval);
    $("#liveGraphs").hide();
    $("#coinsCard").show();
    $("#search").show();
    $("#about").hide();
})

$("#livePage").on("click", async () => {
    $("#homePage").prop("disabled", true);
    $("#aboutPage").prop("disabled", true);
    $("#liveGraphs").hide();
    $("#spinner").show();
    start();
    setTimeout(() => {
        $("#spinner").hide();
        $("#liveGraphs").show();
        drawCoins();
        $("#homePage").prop("disabled", false);
        $("#aboutPage").prop("disabled", false);
    }, 4000);
    $("#coinsCard").hide();
    $("#search").hide();
    $("#about").hide();
})
$("#aboutPage").on("click", async () => {
    clearInterval(myFirstIntreval);
    clearInterval(mySecondInterval);
    $("#liveGraphs").hide();
    $("#coinsCard").hide();
    $("#search").hide();
    $("#about").show();
})
// #endregion





/**
 * 
 * @param {*} i index of the card
 * @param {*} coinSym The symbol of the coin
 * @returns adding the information into arrays and using them in live graphs and modal
 */
function toggle(i, coinSym) {
    $('#myModal').modal('hide');
    let coinValidation = nameList.find((x) => x === coinSym);
    let coinIndex = nameList.findIndex((x) => x === coinSym);
    if ($(`#checkbox${i}`).is(":checked") && nameListIndex == 5 && !coinValidation) {
        showModal(`'${coinSym}'`, i);
    }
    if ($(`#checkbox${i}`).is(":checked") && nameListIndex <= 4 && !coinValidation) {
        $(`#card${i}`).css("background-color", "rgba(50, 50, 250, 0.60)");
        nameList[nameListIndex] = coinSym;
        cardIndexList[nameListIndex] = i; nameListIndex++;
    }

    if ($(`#checkbox${i}`).is(":checked") == false && nameListIndex >= 0 && nameListIndex <= 5) {
        $(`#card${i}`).css("background-color", "#f2e5d76f");
        if (coinValidation) {
            cardIndexList.splice(coinIndex, 1);
            priceList.splice(coinIndex, 1);
            nameList.splice(coinIndex, 1);
            nameListIndex--;
        }
    }


}
 //#endregion