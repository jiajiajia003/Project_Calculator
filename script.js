let firstNumber = ""; 
let secondNumber = "";
let operator = '';
let isResult = false;
const display = document.querySelector(".display");
const dot = document.querySelector("#dot");
const operateButtons = document.querySelectorAll(".operator");
const digitButtons = document.querySelectorAll(".digit");
const equalButton = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
 

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Ah-oh"
    }
    return a / b;
 }

function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "add":
            return add(a, b);
            break;
        case "subtract":
            return subtract(a, b);
            break;
        case "multiply":
            return multiply(a, b);
            break;
        case "divide":
            return divide(a, b);
            break;
    }
}

function formatNumber(num) {
    const numStr = num.toString();

    if (numStr.length > 14) {
        return num.toExponential(8);
    } 
    return numStr;
}


document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) document.querySelector(`#key${key}`)?.click();
    if (key === "+") document.querySelector("#add")?.click();
    if (key === "-") document.querySelector("#subtract")?.click();
    if (key === "*" || key === "x") document.querySelector("#multiply")?.click();
    if (key === "/" || key === "÷") document.querySelector("#divide")?.click();
    if (key === ".") document.querySelector("#dot")?.click();
    if (key === "Enter" || key === "=") document.querySelector("#equal")?.click();
    if (key === "Escape") document.querySelector("#clear")?.click();
    if (key === "Backspace") document.querySelector("#backspace")?.click();
})


dot.addEventListener("click", () => {
    if (!display.textContent.includes(".")) {
        if (display.textContent == firstNumber) {
            firstNumber += ".";
        } else if (display.textContent == secondNumber) {
            secondNumber += ".";
        }
        display.textContent += ".";
    }
})


backspace.addEventListener("click", () => {
    if (display.textContent == firstNumber) {
        firstNumber = firstNumber.slice(0, -1);
    } else if (display.textContent == secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
    }
    display.textContent = display.textContent.slice(0, -1);
})


digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!secondNumber && !operator) {
            if (!isResult) {
                if (firstNumber.length < 14) {
                    firstNumber += button.textContent;
                }
            } else {
                firstNumber = button.textContent;
                isResult = false;
            }
            display.textContent = firstNumber;
        } else if (firstNumber && operator) {
            if (secondNumber.length < 14) {
                secondNumber += button.textContent;
                display.textContent = secondNumber;
            }
        }
    })
})


operateButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (firstNumber) {
            operator = button.id;
        }
    })
})


equalButton.addEventListener("click", () => {
    if (firstNumber && operator && secondNumber) {
        const result = operate(firstNumber, secondNumber, operator);
        firstNumber = formatNumber(result);
        display.textContent = firstNumber;
        isResult = true;
        operator = "";
        secondNumber = "";
    }
})


clear.addEventListener("click", () => {
    firstNumber = ""; 
    secondNumber = "";
    operator = "";
    display.textContent = "";
})
