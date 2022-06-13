

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
        this.currentValue = this.currentValue.toString() + number.toString()

    }
    
    chooseoperator(operator) {
        if(this.currentValue === '')return
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
                computation = prev / current
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
let errMessage = document.querySelector('#err').innerHTML;

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


