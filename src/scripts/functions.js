let totalCount = 0,
    itemsInArray = [],
    itemsObj = {};

const products = document.querySelector('.product-table');

const addMinus = (event, value) => {
    let $objectElem = $(event).parents('.js-item-row'),
        obejItem = $objectElem.find('.js-item').text(),
        totalValue = parseFloat($objectElem.find('.js-cost-in').text()) * value;
    $objectElem.find('.js-cost-final').text(totalValue);
    itemsObj[obejItem] = value;
    Object.keys(itemsObj).forEach(function (index, value) {
        let itemToPush = {};
        itemToPush[index] = itemsObj[index]
        itemsInArray.push(itemToPush);
    })

    console.log(itemsInArray);
    itemsInArray = [];
}

const updateTotals = () => {
    let itemsCost = document.querySelectorAll('.js-cost-final');
    let subTotalText = document.querySelector('.subtotal-amt');
    let vatText = document.querySelector('.vat-amt');
    let totalText = document.querySelector('.total-amt');

    console.log(itemsCost);
    let sum = 0;
    [...itemsCost].forEach(item => {
        sum += parseFloat(item.innerHTML);
    });

    subTotalText.innerHTML = sum;
    vatText.innerHTML = sum * 0.2;
    totalText.innerHTML = sum + sum * 0.2;
}

//=================================================================
//event delegation JQUERY style
//=================================================================

$(document).on('click', '.js-minus', function (e) {
    e.preventDefault();
    let $objectElem = $(e.currentTarget).parents('.js-item-row'),
        $inputElem = $objectElem.find('.js-input-value');
    $inputElem.val(parseInt($inputElem.val()) - 1);
    addMinus(e.currentTarget, parseInt($inputElem.val()));
    updateTotals();
});

$(document).on('click', '.js-plus', function (e) {
    e.preventDefault();
    let $objectElem = $(e.currentTarget).parents('.js-item-row'),
        $inputElem = $objectElem.find('.js-input-value');
    $inputElem.val(parseInt($inputElem.val()) + 1);
    addMinus(e.currentTarget, parseInt($inputElem.val()));
    updateTotals();
});

$(document).on('change', '.js-input-value', function (e) {
    if ($(e.currentTarget).val()) {
        addMinus(e.currentTarget, parseInt($(e.currentTarget).val()));
        updateTotals();
    }

})


//=================================================================
//event delegation - VANILLA JS style
//=================================================================

products.addEventListener('click', function (event) {
    if (!event.target.matches('.js-trash')) return;
    let row = event.target.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotals();
}, false);

export {updateTotals, addMinus};