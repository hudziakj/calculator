class CalcController {
  constructor() {
    this._operation = [];
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#date");
    this._timeEl = document.querySelector("#hour");
    this._currentDate;
    this.initialize();
    this.initButtonsEvents();
  }

  initialize() {
    this.setDisplayDateTime();
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  clearAll() {
    this._operation = [];
  }

  clearEntry() {
    this._operation.pop();
  }

  setError() {
    this.displayCalc = "Error";
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  isOperator(value) {
    return ["+", "-", "*", "/", "%"].indexOf(value) > -1;
  }

  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      //String
      if (this.isOperator(value)) {
        //Change operator
        this.setLastOperation(value);
      } else if (isNaN(value)) {
        //Other
        console.log(value);
      } else {
        this._operation.push(value);
      }
    } else {
      //Number
      let newValue = this.getLastOperation().toString() + value.toString();
      this.setLastOperation(parseInt(newValue));
    }

    console.log(this._operation);
  }

  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.clearEntry();
        break;
      case "percentage":
        this.addOperation("%");
        break;
      case "division":
        this.addOperation("/");
        break;
      case "multiplication":
        this.addOperation("*");
        break;
      case "subtraction":
        this.addOperation("-");
        break;
      case "sum":
        this.addOperation("+");
        break;
      case "dot":
        this.addOperation(".");
        break;
      case "equal":
        console.log("Clicou no 9");
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        break;
      default:
        this.setError();
        break;
    }
  }

  initButtonsEvents() {
    let buttons = document.querySelectorAll(".keys > button");
    buttons.forEach((element) => {
      element.addEventListener("click", (el) => {
        let textBtn = element.className.replace("btn-", "");
        this.execBtn(textBtn);
      });
    });
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale);
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }

  set displayTime(value) {
    this._timeEl.innerHTML = value;
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  set displayDate(value) {
    this._dateEl.innerHTML = value;
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }

  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._dateEl.innerHTML = value;
  }
}
