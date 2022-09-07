/**
 * 
 * @param {*} i index of the cards and coins
 * @param {*} coinId id of the coin
 * api request for current prices in usd ,eur,ils
 */
async function getCoinInfo(i, coinId) {
    if (coinsMoreInfoArr) {
        $("#spinnerMi").show();
        try {
            let coinInfo = await getCoinsAsync(`https://api.coingecko.com/api/v3/coins/${coinId}`)
            setTimeout(function () {
                saveCoinMoreInfo(i, coinId, coinInfo);
                $("#spinnerMi").hide();
            }, 2000);
        }
        catch {
            console.log(e);
        }
    }
}
/**
 * 
 * @param {*} i index of the cards and coins
 * @param {*} coinId id of the coin 
  
 * calling every to coin extra information and after 10 minutes antoher call to api and geting the update prices.
 */
function printCoinMoreInfo(i, coinId) {
    let t;
    let inProgress = false;
    let coin = coinsMoreInfoArr.find(x => x.coinId === coinId);
    let coinIndex = coinsMoreInfoArr.findIndex(x => x.coinId == coinId);
    if (coin) {
        if (coinsMoreInfoArr[coinIndex].usd != undefined) {
            $(`#info${i}`).html(`
                <div><img src="${coinsMoreInfoArr[coinIndex].pic}"> price : </div>
                <div>${coinsMoreInfoArr[coinIndex].usd}$</div>
                <div>${coinsMoreInfoArr[coinIndex].eur}&euro;</div>
                <div>${coinsMoreInfoArr[coinIndex].ils}&#8362;</div>`);
        }
        else {
            $(`#info${i}`).html(`This coin currently has no price.`);
        }
        clearTimeout(t);

    }
    else {

        getCoinInfo(i, coinId);

    }
    if (!inProgress) {
        inProgress = true;
        let t1 = setTimeout(() => {

            getCoinInfo(i, coinId);
            inProgress = false;
            clearTimeout(t1);
        }, 4000);
    }
}
/**
 * 
 * @param {*} i index of the cards and coins
 * @param {*} coinInfo the api data of the coin
 * @param {*} coinId id of the coin 
 * pushing if the array dont have the coin or replacing after 2 minuts  the same coin .
 */
function saveCoinMoreInfo(i, coinId, coinInfo) {
    let coinI = coinsMoreInfoArr.findIndex(x => x.coinId == coinId);
    if (coinI == -1) {
        coinsMoreInfoArr.push(new mInfo(coinId, i, coinInfo.image.thumb, coinInfo.market_data.current_price.usd, coinInfo.market_data.current_price.eur, coinInfo.market_data.current_price.ils));
    }
    else {
        coinsMoreInfoArr[coinI] = new mInfo(coinId, i, coinInfo.image.thumb, coinInfo.market_data.current_price.usd, coinInfo.market_data.current_price.eur, coinInfo.market_data.current_price.ils);
    }
    let coinIndex = coinsMoreInfoArr.findIndex(x => x.coinId == coinId);
    if (coinsMoreInfoArr[coinIndex].usd != undefined) {
        $(`#info${i}`).html(`
            <div><img src="${coinsMoreInfoArr[coinIndex].pic}"> price : </div>
            <div>${coinsMoreInfoArr[coinIndex].usd}$</div>
            <div>${coinsMoreInfoArr[coinIndex].eur}&euro;</div>
            <div>${coinsMoreInfoArr[coinIndex].ils}&#8362;</div>`);
    }
    else {
        $(`#info${i}`).html(`This coin currently has no price.`);
    }
}
