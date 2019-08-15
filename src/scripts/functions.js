let totalCount = 0,
    itemsInArray = [],
    itemsObj = {},
    finalArray =[];

const products = document.querySelector('.product-table');
const buyNow = document.querySelector('.js-buy');


const addMinus = (event, value) => {
    let $objectElem = $(event).parents('.js-item-row'),
        obejItem = $objectElem.find('.js-item').text(),
        totalValue = (parseFloat($objectElem.find('.js-cost-in').text()) * value).toFixed(2) ;
    $objectElem.find('.js-cost-final').text(totalValue);
    itemsObj[obejItem] = value;
    Object.keys(itemsObj).forEach(function (index, value) {
        let itemToPush = {};
        itemToPush[index] = itemsObj[index]
        itemsInArray.push(itemToPush);
    })

    finalArray = Array.from(itemsInArray);
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
        sum += (parseFloat(item.innerHTML)).toFixed(2);
    });

    subTotalText.innerHTML = (parseFloat(sum)).toFixed(2);
    vatText.innerHTML = (parseFloat(sum) * 0.2).toFixed(2);
    totalText.innerHTML = (parseFloat(sum + sum) * 0.2).toFixed(2);
}
const commonFunction = (target,value) => {
    if(value <11) {
        addMinus(target,value);
        updateTotals();
    }
    else {
        $(target).parents('.js-item-row').find('.js-input-value').val(10);
    }
    
}

//=================================================================
//event delegation JQUERY style
//=================================================================

$(document).on('click', '.js-minus', function (e) {
    e.preventDefault();
    let $objectElem = $(e.currentTarget).parents('.js-item-row'),
        $inputElem = $objectElem.find('.js-input-value');
    $inputElem.val(parseInt($inputElem.val()) - 1);
    commonFunction(e.currentTarget, parseInt($inputElem.val()));
    
});

$(document).on('click', '.js-plus', function (e) {
    e.preventDefault();
    let $objectElem = $(e.currentTarget).parents('.js-item-row'),
        $inputElem = $objectElem.find('.js-input-value');
    $inputElem.val(parseInt($inputElem.val()) + 1);
    commonFunction(e.currentTarget, parseInt($inputElem.val()));
    
});

$(document).on('change', '.js-input-value', function (e) {
    if ($(e.currentTarget).val()) {
        commonFunction(e.currentTarget, parseInt($(e.currentTarget).val()));
    }

})


//=================================================================
//event delegation - VANILLA JS style
//=================================================================

products.addEventListener('click', function (event) {
    if (!event.target.matches('.js-trash')) return;
    let row = event.target.parentNode.parentNode;
    row.parentNode.removeChild(row);
    if(document.querySelectorAll('.js-item-row').length < 1) {
        buyNow.setAttribute('disabled','disabled');
    }
    updateTotals();
}, false);
buyNow.addEventListener('click',function(event){

$.ajax({
    type:'POST',
    url:'#',
    data:finalArray,
    dataType:'json',
    success:function(resultData) {
        console.log('data posted'+ resultData);
    },
    error:function(error) {
        console.log('error issue'+error.responseText);
        console.log('data posted'+ resultData);
    }
})
},false);

export {updateTotals, addMinus};