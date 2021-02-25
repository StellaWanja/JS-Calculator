//set of data that needs to be contained and interacted in many ways
class Calculator {
    constructor(divTopResults, divBottomResults) {
        this.divTopResults = divTopResults;
        this.divBottomResults = divBottomResults;
        this.allClear(); //new calc resume to zero
    }
//define methods
    allClear(){
        this.bottomResults = '';
        this.topResults = '';
        this.operation = undefined;
    }

    delete(){
        this.bottomResults = this.bottomResults.toString().slice(0,-1);
    }

    addNumberToScreen(number){
        if(number === '.' && this.bottomResults.includes('.')) return; //avoid adding more than one decimal
        this.bottomResults = this.bottomResults.toString() + number.toString(); //convert to string to append numbers eg 1+1=11 not 1+1=2
    }

    chooseOperation(operation){
        if(this.bottomResults === '') return;
        if(this.topResults !== ''){
            this.calculate(); //call the calculate fn if not empty
        }
        this.operation = operation;
        this.topResults = this.bottomResults;
        this.bottomResults = ''; //push bottom results to top, clear bottom
    }

    calculate(){
        let calculation;
        const top = parseFloat(this.topResults); //number
        const bottom = parseFloat(this.bottomResults); //number
        if(isNaN(top) || isNaN(bottom)) return;
        //calculation using switch
        switch(this.operation){
            case '+':
                calculation = top + bottom;
                break;
            case '-':
                calculation = top - bottom;
                break;
            case 'x':
                calculation = top * bottom;
                break;
            case '÷':
                calculation = top / bottom;
                break;   
            default:
                return;
        }
        this.operation = undefined;
        this.bottomResults = calculation;
        this.topResults = '';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }

    updateDisplayOnScreen(){
        this.divBottomResults.innerText = this.getDisplayNumber(this.bottomResults);
        if(this.operation != null){
            this.divTopResults.innerText = `${this.topResults} ${this.operation}`; //append operation and num
        } else {
            this.divTopResults.innerText = ''
        }
    }
}

const divTopResults = document.querySelector('[data-top-results]');
const divBottomResults = document.querySelector('[data-bottom-results]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const operationBtns = document.querySelectorAll('[data-operation]');
const numberBtns = document.querySelectorAll('[data-number]');
const equalsBtn = document.querySelector('[data-equals]');

const calculator = new Calculator(divTopResults, divBottomResults);

allClearBtn.addEventListener('click', btn => {
    calculator.allClear();
    calculator.updateDisplayOnScreen();
});

deleteBtn.addEventListener('click', btn => {
    calculator.delete();
    calculator.updateDisplayOnScreen();
});

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.addNumberToScreen(btn.innerText); //add number to results section
        calculator.updateDisplayOnScreen(); //display numbers
    });
});

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText); //add number to results section
        calculator.updateDisplayOnScreen(); //display numbers
    });
});

equalsBtn.addEventListener('click', btn => {
    calculator.calculate(); //calculate and display on click
    calculator.updateDisplayOnScreen();
});