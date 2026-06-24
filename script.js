const display = document.querySelector("#display")
const allClearBtn = document.querySelector("#allClear")
const backSpaceBtn = document.querySelector("#backspace")
const numBtns = document.querySelectorAll(".numBtn")
const decimalBtn = document.querySelector("#decimalBtn")
const operatorBtns = document.querySelectorAll(".operatorBtn")

let awaitingNumber = false
let firstNum = null
display.textContent = "0"

const calculate = (a, b, op) => {
    switch (op) {
        case "+":
            return a + b
        case "-":
            return a - b
        case "x":
            return a * b
        case "÷":
            return b === 0 ? "Error" : a / b;
        default:
            return b
    }
}

backSpaceBtn.addEventListener('click', () => {

    if (awaitingNumber) {
        return
    }

    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1)
    }

    else {
        display.textContent = "0"
    }
})

numBtns.forEach(button => {
    button.addEventListener('click', () => {

        const num = button.textContent

        if (awaitingNumber) {
            display.textContent = num
            awaitingNumber = false
        }

        else {
            display.textContent = display.textContent === "0" ? num : display.textContent += num
        }
    })
})

allClearBtn.addEventListener('click', () => {
    display.textContent = "0"
    operator = null
    awaitingNumber = false
    firstNum = null
})

decimalBtn.addEventListener('click', () => {
    
    if (awaitingNumber) {
        display.textContent = "0."
        awaitingNumber = false
        return
    }

    if (!display.textContent.includes(".")) {
        display.textContent += "."
    }
})

operatorBtns.forEach(button => {
    button.addEventListener('click', () => {
        const nextOperator = button.textContent
        const currentVal = parseFloat(display.textContent)

        if (display.textContent === "Error") {
            return
        }

        if (firstNum === null) {
            firstNum = currentVal
        }

        else if (operator && !awaitingNumber) {
            const result = calculate(firstNum, currentVal, operator)
            display.textContent = String(result)
            firstNum = result
        }

        awaitingNumber = true;

        if (nextOperator === "=") {
            operator = null
            awaitingNumber = false
            firstNum = null
        }

        else {
            operator = nextOperator
        }
    })
})

window.addEventListener('keydown', (event) => {
    let key = event.key

    if (key === '*') {
        key = 'x'
    }

    if (key === '/') {
        key = '/'
    }

    if (key === 'Enter') {
        key = '='
    }

    const button = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent === key)
    if (button) button.click()
    if (event.key === 'Backspace') backSpaceBtn.click()
    if (event.key === 'Escape') allClearBtn.click()
})