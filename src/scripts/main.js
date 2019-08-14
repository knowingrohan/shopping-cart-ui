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
    <div class="layout-inline row">
        <div class="col col-pro layout-inline">
            <p>${product.name}</p>
        </div>
        <div class="col col-price col-numeric align-center ">
            <p>£${product.price}</p>
        </div>
        <div class="col col-qty layout-inline">
        <input type="number" value=${product.qty} name="quantity" min="1" max="10">
            <button>+</button>
            <button>-</button>
        </div>
        <div class="col col-vat col-numeric">
            <p>£1.99</p>
        </div>
        <div class="col col-trash">
            <img src=${TrashCan} alt="delete-product" />
        </div>
    </div>`;

    productTable.insertAdjacentHTML("beforebegin", template);
}



FetchTableData(url);