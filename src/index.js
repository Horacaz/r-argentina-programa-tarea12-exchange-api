const URL = 'https://v6.exchangerate-api.com/v6/aa91db0af07de43e0e36201b';
let $baseCurrency = document.querySelector('.base-currency');
let $targetCurrency = document.querySelector('.target-currency');
let $results = document.querySelector('#results');
const $baseAmount = document.querySelector("#base-amount");
let currencyRates;
let currencyNames;


fetch(`${URL}/latest/USD`)
.then(response => response.json())
.then(data => {
    currencyRates = data['conversion_rates'];

})

fetch(`${URL}/codes`)
.then(response => response.json())
.then(data => {
    currencyNames = data['supported_codes'];
    createBaseCurrencyOptions(currencyNames);
    createTargetCurrencyOptions(currencyNames);
})

$baseCurrency.oninput = () => {
    fetch(`${URL}/latest/${$baseCurrency.value}`)
    .then(response => response.json())
    .then(data => {
    currencyRates = data['conversion_rates'];
    exchangeRatesDate(data['time_last_update_utc'], $baseCurrency.value);
    createExchanteRatesTable(currencyRates, currencyNames)
})
}

$baseAmount.oninput = () =>{
    calculateExchange(currencyRates, Number($baseAmount.value), $targetCurrency.value);
}

function createBaseCurrencyOptions(currencyNames){
    for(let i = 0; i < currencyNames.length; i++){
        let currency = document.createElement('option');
        currency.setAttribute('value', currencyNames[i][0]);
        currency.textContent = `${currencyNames[i][0]} - ${currencyNames[i][1]}`;
        $baseCurrency.appendChild(currency);
    }
}

function createTargetCurrencyOptions(currencyNames){
    for(let i = 0; i < currencyNames.length; i++){
        let currency = document.createElement('option');
        currency.setAttribute('value', currencyNames[i][0]);
        currency.textContent = `${currencyNames[i][0]} - ${currencyNames[i][1]}`;
        $targetCurrency.appendChild(currency);
    }
}

function calculateExchange(currencyRates, amount, targetCurrency){
    let conversionRates = currencyRates[targetCurrency];
    $results.value = conversionRates * amount;
    return
}

function exchangeRatesDate(date, baseCurrency){
    document.querySelector('#base-currency').textContent = baseCurrency;
    document.querySelector('#current-date').textContent = date.slice(0, 16);
}

function createExchanteRatesTable(currencyRates, currencyNames){
clearCurrencyTable()
const $table = document.querySelector('#currency-table');

for (let i = 0; i < currencyNames.length; i++ ){
    let $tableCurrencyCode = document.createElement('td');
    $tableCurrencyCode.setAttribute('class', 'table-currency-code');
    $tableCurrencyCode.textContent = `${currencyNames[i][0]}`;

    let $tableCurrencyName = document.createElement('td');
    $tableCurrencyName.setAttribute('class', 'table-currency-name');
    $tableCurrencyName.textContent =`${currencyNames[i][1]}`;

    let $tableCurrencyRate = document.createElement('td');
    $tableCurrencyRate.setAttribute('class', 'table-currency-rate');
    $tableCurrencyRate.textContent = `${currencyRates[currencyNames[i][0]]}`;

    let $tableRow = document.createElement('tr');
    $tableRow.setAttribute('class', 'table');

    $tableRow.appendChild($tableCurrencyCode);
    $tableRow.appendChild($tableCurrencyName);
    $tableRow.appendChild($tableCurrencyRate);

    $table.appendChild($tableRow);
}
}

function clearCurrencyTable(){
    if (document.querySelector('.table')){
        let rows = document.querySelectorAll('tr');
        for(let i = 1; i < rows.length; i++){
            document.querySelector('.table').remove();
        }
    }
    return
}
  
