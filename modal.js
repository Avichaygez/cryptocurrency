
/**
 * @param {*} coinSym symbol of the last coin 
 * @param {*} i index of the card of the last coin
 * printing the information on the modal
 */
function showModal(coinSym, i) {
    $("#modalBody").html("");
    $('#myModal').modal('show');
    $(`#checkbox${i}`).prop("checked", false);
    for (let indexOftoggle = 0; indexOftoggle <= 4; indexOftoggle++) {
        $("#modalBody").append(`
                <div>
                    <span id="mCoinName${indexOftoggle}" >${nameList[indexOftoggle]}</span>
                        <span  class="form-check form-switch">
                            <input type="checkbox" onclick="chngAble(${indexOftoggle},${coinSym})" id="mCheckbox${indexOftoggle}"  class="form-check-input" role="switch">
                        </span>
                </div>
        `);
        $(`#mCheckbox${indexOftoggle}`).prop("checked", true);
    }
    $(`.modal-footer`).html(`
    <button type="button" class=" btn-danger" data-bs-dismiss="modal" onclick="cancelSwitch()">Close</button>
    <button type="button" class=" btn-success" data-bs-dismiss="modal" onclick="coinSwap(${i},${coinSym})">submit</button>`
    );
}


/**
 * 
 * @param {*} indexOftoggle index of 5 cards in the modal
 changing the availability of the coins toggle
 */
function chngAble(indexOftoggle,) {
    if ($(`#mCheckbox${indexOftoggle}`).is(":checked") == false) {
        let cardIndex = cardIndexList[indexOftoggle];
        $(`#card${cardIndex}`).css("background-color", "#f2e5d76f");
        $(`#checkbox${cardIndex}`).prop("checked", false);

        for (let index = 0; index <= 4; index++) {
            if (index != indexOftoggle) {
                $(`#mCheckbox${index}`).prop("disabled", true);
            }
        }
    }
    else {
        let cardIndex = cardIndexList[indexOftoggle];
        $(`#card${cardIndex}`).css("background-color", "rgba(50, 50, 250, 0.60)");
        $(`#checkbox${cardIndex}`).prop("checked", true);
        for (let index = 0; index <= 4; index++) {
            if (index != indexOftoggle) {
                $(`#mCheckbox${index}`).prop("disabled", false);
            }
        }
    }
}

/**
 * 
 * @param {*} i index of the last card 
 * @param {*} coinSym name of the last coin that add up
 * deleting from the lists the coin that the user choose to delete
 */
function coinSwap(i, coinSym) {
    let coinSwapVal = false;
    for (let index = 4; index >= 0; index--) {
        if ($(`#mCheckbox${index}`).is(":checked") == false) {
            cardIndexList.splice(index, 1);
            nameList.splice(index, 1);
            priceList.splice(index, 1);
            coinSwapVal = true;
        }
        if (coinSwapVal == true) {
            $(`#card${i}`).css("background-color", "rgba(50, 50, 250, 0.60)");
            $(`#checkbox${i}`).prop("checked", true);
            nameList.push(coinSym);
            cardIndexList.push(i);
            coinSwapVal = false;
        }
    }
}

function cancelSwitch() {
    let cancelVal;
    for (let index = 0; index <= 4; index++) {
        if ($(`#mCheckbox${index}`).is(":checked") == false) {
            cancelVal = false;
        }


    }
    if (cancelVal == false) {
        for (let index = 0; index <= 4; index++) {
            let cardI = cardIndexList[index];
            $(`#card${cardI}`).css("background-color", "rgba(50, 50, 250, 0.60)");
            $(`#checkbox${cardI}`).prop("checked", true);
        }

    }
}