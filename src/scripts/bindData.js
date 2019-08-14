import TrashCan from '../img/trash-icon.png'

//variables ===================================================

const productTable = document.getElementById('product-table-footer');
const url = 'http://www.mocky.io/v2/5d5452062f0000c127861561';


//event handlers ====================================




//utility funcytions ================================

function FetchTableData(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let data = json.config;
            //console.log(data.);
            data.forEach(element => {
                bindDataIntoTemplate(element)
            });

        });
}

function bindDataIntoTemplate(product) {
    let template = `
    <div class="layout-inline row js-item-row">
        <div class="col col-pro">
            <p class="js-item">${product.name}</p>
        </div>
        <div class="col col-price col-numeric align-center ">
            <p>£<span class="js-cost-in">${product.price}</span></p>
        </div>
        <div class="col col-qty">
        <input type="number" value=${product.qty} name="quantity" min="1" max="10" class="js-input-value">
            <button class="js-plus">+</button>
            <button class="js-minus">-</button>
        </div>
        <div class="col col-net">
            <p>£<span class="js-cost-final">1.99</span></p>
        </div>
        <div class="col col-trash">
            <img src=${TrashCan} alt="delete-product" />
        </div>
    </div>`;

    productTable.insertAdjacentHTML("beforebegin", template);
}



FetchTableData(url);