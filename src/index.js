
import './styles/main.scss';
import './scripts/bindData';
import './scripts/functions';
import { updateTotals } from './scripts/functions';

//initial display of figures;
(() => {
    let rows = document.querySelectorAll('.js-item-row');
    [...rows].forEach(row => {
        let tempCost = row.querySelector('.js-cost-final');
        let itemPrice = parseFloat(row.querySelector('.js-cost-in').innerHTML);
        let itemVal = parseInt(row.querySelector('.js-input-value').value);
        tempCost.innerHTML = itemPrice * itemVal;
    });

})();

updateTotals();

