

class Calculator {
    constructor(previousValueTextElement, currentValueTextElement) {
        this.previousValueTextElement = previousValueTextElement;
        this.currentValueTextElement = currentValueTextElement;
        this.clear()
    }
    
    clear() {
        this.previousValue = '';
        this.currentValue = '';
        this.operator = undefined;

    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1);

    }

    appendNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return
        if (number === '0' && this.currentValue === ('0')) return
        if (this.currentValue ===errorMessage) {
            this.currentValue = ''
        }
        if (typeof (this.currentValue) === 'number' ){
            this.currentValue = ''
        }
        this.currentValue = this.currentValue.toString() + number.toString()

    }
    
    chooseoperator(operator) {
        if(this.currentValue === '')return
        if (this.currentValue ===errorMessage) {
            this.currentValue = ''
        }
        if(this.currentValue !== '') {
            this.compute()
        }
        this.operator = operator
        this.previousValue = this.currentValue
        this.currentValue = ''
    }
   
    compute() {
        let computation
        const prev = parseFloat(this.previousValue)
        const current = parseFloat(this.currentValue)
        if (isNaN(prev) || isNaN(current)) return
        
        switch (this.operator) {
            case '/':
                if (prev / current && current===0) {
                    computation = errorMessage    
                } else {
                    computation = prev / current
                }
                break

            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break

            case '*':
                computation = prev * current
                break

            default:
                return
        }
        if (computation % 1 !== 0 && computation !== errorMessage) {
            let computationString = computation.toString().split(".")
            if (computationString[1].length > 8) {
                computation = parseFloat(computation.toPrecision(8))
            }
        }
        this.currentValue = computation
        this.operator = undefined
        this.previousValue = ''
    }

    updateDisplay() {
        this.currentValueTextElement.innerText = this.currentValue
        this.previousValueTextElement.innerText = this.previousValue
    
    }
}


const previousValueTextElement = document.querySelector('[data-previousDisplay]');
const currentValueTextElement = document.querySelector('[data-currentDisplay]')
const allClearButton = document.querySelector('[data-allClear]');
const deleteButton = document.querySelector('[data-delete]');
const operatorButton = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalButton = document.querySelector('[data-equals]');
const errorMessage = document.querySelector('#err').innerHTML
const numList = ['1','2','3','4','5','6','7','8','9','0','.']
const operatorList =['/', '-', '+', '*',]


const calculator = new Calculator(previousValueTextElement,
     currentValueTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
})

operatorButton.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseoperator(button.innerText)
      calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', () => {
        calculator.compute()
        calculator.updateDisplay()
    })

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})



document.addEventListener('keydown', (event) => {
    if (numList.includes(event.key)){
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    else if (operatorList.includes(event.key)) {
        calculator.chooseoperator(event.key)
        calculator.updateDisplay()
    }
    else if ('Backspace'.includes(event.key)) {
        calculator.delete()
        calculator.updateDisplay()
    }
    else if ('Delete'.includes(event.key)) {
        calculator.clear()
        calculator.updateDisplay()
    }
    else if ('Enter'.includes(event.key)) {
        calculator.compute()
        calculator.updateDisplay()
    }
})


