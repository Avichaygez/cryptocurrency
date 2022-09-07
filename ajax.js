/**
 * 
 * @param {*} URL  =The Url of coins
 * @returns  = Coinslist
 */
 function getCoinsAsync(URL) {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "GET",
            url: URL,
            success: function (coinsList) {
                resolve(coinsList);
            },
            error: e => reject(e)
        });
    });
}
