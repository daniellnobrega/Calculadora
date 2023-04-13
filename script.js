const display = document.getElementById('display');
const keys = document.querySelectorAll("[id*=tecla]");
const operators = document.querySelectorAll("[id*=operador]");

let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(numero) {
    if (newNumber) {
        display.textContent = numero;
        newNumber = false;
    } else {
        display.textContent += numero;
    }
}

const insertNumber = (number) => updateDisplay(number)

keys.forEach(function (key) {
    key.addEventListener("click", function (event) {
        insertNumber(event.target.textContent);
    })
});

const selectOperator = (event) => {
    previousNumber = display.textContent;
    operator = event.target.textContent;
    newNumber = true;
};

operators.forEach((key) =>
    key.addEventListener("click", selectOperator));


const calculate = () => {
    const actualNumber = display.textContent;
    let result = eval(previousNumber.replace(',','.') + operator + actualNumber.replace(',','.')).toFixed(2)
    result = result.toString()

    if(result.includes(".00")){
        result = result.replace('.00','')
    }

    newNumber = true;
    updateDisplay(result.replace('.',','));
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => display.textContent = "";

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
    newNumber = true;
    operator = undefined;
    previousNumber = undefined;
    clearDisplay();
}

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => {
    newNumber = true;
    updateDisplay(display.textContent.slice(0, -1))
}

document.querySelector("#apagar").addEventListener("click", removeLastNumber);

const inverterSignal = () => {
    newNumber = true
    updateDisplay(String(eval(`${display.textContent.replace(",",".") + ' * (-1)'}`)).replace(".",","));
    // numberAux = display.textContent
    // clearCalc()

    // if (!numberAux.includes('-')) {
    //     updateDisplay('-' + numberAux);
    // } else {
    //     updateDisplay(numberAux.replace('-', ''));
    // }
};

document.querySelector("#inverter").addEventListener("click", inverterSignal);

const virarDecimal = (event) => {
    virgula = event.target.textContent;

    if (display.textContent == '') {
        updateDisplay('0' + virgula);
    } else if (!display.textContent.includes(',')) {
        updateDisplay(virgula)
    }
}

document.querySelector('#decimal').addEventListener("click", virarDecimal);