let myFirstIntreval;
let mySecondInterval;
/**
 * calling for thr coins current price every 10 sec when the api is refreshed
 * 
 */
function start() {
    myFirstIntreval = setInterval(async function coinsPrices() {

        try {
            for (let i = 0; i <= 4; i++) {
                if (nameList[i]) {
                    let coinsPrice = await getCoinsAsync(`https://min-api.cryptocompare.com/data/price?fsym=${nameList[i]}&tsyms=USD`);
                    savePrice(coinsPrice, i);
                    coinValidation();
                }
            }
        }
        catch {
            console.log(e.toString());
        }
    }, 2000)
}

/**
 * @returns  making validation on the coin names and prices
 */
function coinValidation() {
    for (let i = 0; i <= 4; i++) {
        if (nameList[i] == undefined) {
            nameList[i] = `coin ${i + 1}`;
        }
        if (priceList[i] == undefined) {
            priceList[i] = `0`;
        }
    }
};

/** 
 * @param {*} coinsPrice  The coins price list
 * @param {*} i the index of the array
 */
function savePrice(coinsPrice, i) {
    priceList[i] = coinsPrice.USD;
}


/**
 * drawing the graph and updating it
 */
function drawCoins() {
    coinValidation();
    let dataPoints1 = [];
    let dataPoints2 = [];
    let dataPoints3 = [];
    let dataPoints4 = [];
    let dataPoints5 = [];
    let options = {
        title: {
            text: "coins price"
        },
        axisX: {
            title: "chart updates every 2 seconds"
        },
        axisY: {
            suffix: "$"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 15,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: `${nameList[0]}`,
            dataPoints: dataPoints1
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            showInLegend: true,
            name: `${nameList[1]}`,
            dataPoints: dataPoints2
        }, {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            showInLegend: true,
            name: `${nameList[2]}`,
            dataPoints: dataPoints3
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            showInLegend: true,
            name: `${nameList[3]}`,
            dataPoints: dataPoints4
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            showInLegend: true,
            name: `${nameList[4]}`,
            dataPoints: dataPoints5
        }]
    };
    let chart = $("#liveGraphs").CanvasJSChart(options);
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
    const updateInterval = 2000;
    // initial value - price
    let yValue1 = priceList[0];
    let yValue2 = priceList[1];
    let yValue3 = priceList[2];
    let yValue4 = priceList[3];
    let yValue5 = priceList[4];
    let time = new Date();
    function updateChart(count) {


        coinValidation();
        count = count || 1;
        for (let i = 0; i < count; i++) {

            time.setTime(time.getTime() + updateInterval);
            yValue1 = priceList[0];
            yValue2 = priceList[1];
            yValue3 = priceList[2];
            yValue4 = priceList[3];
            yValue5 = priceList[4];
            // pushing the new values
            dataPoints1.push({
                x: time.getTime(),
                y: yValue1
            });
            dataPoints2.push({
                x: time.getTime(),
                y: yValue2
            });
            dataPoints3.push({
                x: time.getTime(),
                y: yValue3
            });
            dataPoints4.push({
                x: time.getTime(),
                y: yValue4
            });
            dataPoints5.push({
                x: time.getTime(),
                y: yValue5
            });
        }
        options.data[0].legendText = `"${nameList[0]} : "` + yValue1 + "$";
        options.data[1].legendText = `"${nameList[1]} : "` + yValue2 + "$";
        options.data[2].legendText = `"${nameList[2]} : "` + yValue3 + "$";
        options.data[3].legendText = `"${nameList[3]} : "` + yValue4 + "$";
        options.data[4].legendText = `"${nameList[4]} : "` + yValue5 + "$";
        $("#liveGraphs").CanvasJSChart().render();
    }

    updateChart(1);
    if (nameList[0] != "coin 1") {
        mySecondInterval = setInterval(function () { updateChart() }, updateInterval);
    }
}
