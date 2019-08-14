let totalCount = 0,
    itemsInArray = [],
    itemsObj = {};
let addMinus = (event, value) => {
    let $objectElem = $(event).parents('.js-item-row'),
        obejItem = $objectElem.find('.js-item').text(),
        totalValue = parseFloat($objectElem.find('.js-cost-in').text()) * value;
    $objectElem.find('.js-cost-final').text(totalValue);

    itemsObj[obejItem] = value;
    // if(!itemsInArray.length) {
    //     itemsInArray.push(itemsObj);
    // }

    // else {
    //     for(let i=0;i<itemsInArray.length;i++) {
    //         if(itemsInArray[i][obejItem]) {
    //             itemsInArray[i][obejItem]=value;
    //         }
    //         else {
    //             itemsInArray.push(itemsObj);

    //         }
    //     }
    // }
    Object.keys(itemsObj).forEach(function (index, value) {
        let itemToPush = {};
        itemToPush[index] = itemsObj[index]
        itemsInArray.push(itemToPush);
    })

    console.log(itemsInArray);
    itemsInArray = [];
}
$(document).on('click', '.js-minus', function (e) {
    e.preventDefault();
    let $objectElem = $(e.currentTarget).parents('.js-item-row'),
        $inputElem = $objectElem.find('.js-input-value');
    $inputElem.val(parseInt($inputElem.val()) - 1);
    addMinus(e.currentTarget, parseInt($inputElem.val()));
});

$(document).on('click', '.js-plus', function (e) {
    e.preventDefault();
    let $objectElem = $(e.currentTarget).parents('.js-item-row'),
        $inputElem = $objectElem.find('.js-input-value');
    $inputElem.val(parseInt($inputElem.val()) + 1);
    addMinus(e.currentTarget, parseInt($inputElem.val()));
});

$(document).on('keyup', '.js-input-value', function (e) {
    if ($(e.currentTarget).val()) {
        addMinus(e.currentTarget, parseInt($(e.currentTarget).val()));
    }

})