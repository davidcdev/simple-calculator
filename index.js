const numbers = document.querySelectorAll('.number');
const signs = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const result = document.querySelector('.result span');
const clear = document.querySelector('#clear');
const negative = document.querySelector('#negative');
const percent = document.querySelector('#percent');
const decimal = document.querySelector('#decimal');

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;
let isDecimalEntered = false;

for (const number of numbers) {
    number.addEventListener('click', handleNumberClick);
}

function handleNumberClick(event) {
    const getValue = event.target.getAttribute('value');
    if (!isFirstValue) {
        getFirstValue(getValue);
    }
    if (!isSecondValue) {
        getSecondValue(getValue);
    }
}

function getFirstValue(el) {
    result.innerHTML = "";
    firstValue += el;
    result.innerHTML = firstValue;
    firstValue = +firstValue;
}

function getSecondValue(el) {
    if (firstValue !== "" && sign !== "") {
        secondValue += el;
        result.innerHTML = secondValue;
        secondValue = +secondValue;
    }    
}

function getSign() {
    for (const sign of signs) {
        sign.addEventListener('click', handleSignClick);
    }
}

function handleSignClick(event) {
    sign = event.target.getAttribute('value');
    isFirstValue = true;
    console.log(sign);
}

getSign();

equals.addEventListener('click', handleEqualsClick);

function handleEqualsClick() {
    result.innerHTML = "";
    if (sign === "+") {
        resultValue = firstValue + secondValue;
    } else if (sign === "-") {
        resultValue = firstValue - secondValue;
    } else if (sign === "x") {
        resultValue = firstValue * secondValue;
    } else if (sign === "/") {
        resultValue = firstValue / secondValue;
    }
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = "";

    checkResultLength();
}

function checkResultLength() {
    resultValue = JSON.stringify(resultValue);

    if (resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(5);
    }
}

clear.addEventListener('click', handleClearClick);

function handleClearClick() {
    result.innerHTML = "0";

    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultValue = 0;
    isDecimalEntered = false;
}

negative.addEventListener('click', handleNegativeClick);

function handleNegativeClick() {
    result.innerHTML = "";
    if (firstValue !== "") {
        resultValue = -firstValue;
        firstValue = resultValue;
    }
    if (firstValue !== "" && secondValue !== "" && sign !== "") {
        resultValue = -resultValue;
    }

    result.innerHTML = resultValue;
    checkResultLength();
}

percent.addEventListener('click', handlePercentClick);

function handlePercentClick() {
    result.innerHTML = "";
    const opPercentage = firstValue * (secondValue / 100);
    if (firstValue !== "" && sign !== "") {
        if (sign === "+") {
            resultValue = firstValue + opPercentage;
        } else if (sign === "-") {
            resultValue = firstValue - opPercentage;
        } else if (sign === "x") {
            resultValue = firstValue * opPercentage;
        } else if (sign === "/") {
            resultValue = firstValue / opPercentage;
        }
    } else if (firstValue !== "") {
        resultValue = firstValue / 100;
        firstValue = resultValue;    
    }

    result.innerHTML = resultValue;
}

decimal.addEventListener('click', handleDecimalClick);

function handleDecimalClick(event) {
    const point = event.target.getAttribute('value');
    result.innerHTML = "";
    if (secondValue >= "0") {
        secondValue += point;
        result.innerHTML = secondValue;
        isDecimalEntered = true;
    } else if (firstValue >= "0") {
        firstValue += point;
        result.innerHTML = firstValue;
        isDecimalEntered = true;
    }
}