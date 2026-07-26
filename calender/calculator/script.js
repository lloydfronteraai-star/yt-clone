const display = document.getElementById('display');
let currentValue = '0';
let previousValue = null;
let operator = null;
let waitingForNext = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function inputDigit(digit) {
  if (waitingForNext) {
    currentValue = digit;
    waitingForNext = false;
    return;
  }
  if (currentValue === '0' && digit !== '.') {
    currentValue = digit;
  } else if (digit === '.' && currentValue.includes('.')) {
    return;
  } else {
    currentValue += digit;
  }
}

function clearCalculator() {
  currentValue = '0';
  previousValue = null;
  operator = null;
  waitingForNext = false;
}

function deleteLast() {
  if (waitingForNext) return;
  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
}

function applyPercent() {
  const value = parseFloat(currentValue);
  if (Number.isFinite(value)) {
    currentValue = String(value / 100);
  }
}

function calculate(nextOperator) {
  const inputValue = parseFloat(currentValue);
  if (operator && previousValue !== null && !waitingForNext) {
    const result = performCalculation[operator](previousValue, inputValue);
    currentValue = String(Number.isFinite(result) ? result : '0');
    previousValue = result;
  } else {
    previousValue = inputValue;
  }
  waitingForNext = true;
  operator = nextOperator;
}

const performCalculation = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => b === 0 ? 0 : a / b,
};

function handleButtonAction(action) {
  if (!isNaN(action)) {
    inputDigit(action);
    return;
  }

  switch (action) {
    case '.':
      inputDigit(action);
      break;
    case 'clear':
      clearCalculator();
      break;
    case 'delete':
      deleteLast();
      break;
    case 'percent':
      applyPercent();
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      calculate(action);
      break;
    case '=':
      if (operator !== null) {
        calculate(operator);
        operator = null;
      }
      break;
  }
}

const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const action = button.dataset.action;
  handleButtonAction(action);
  updateDisplay();
});

window.addEventListener('keydown', (event) => {
  const { key } = event;
  if (key === 'Enter') {
    event.preventDefault();
    handleButtonAction('=');
  } else if (key === 'Backspace') {
    handleButtonAction('delete');
  } else if (key === 'Escape') {
    handleButtonAction('clear');
  } else if (key === '%') {
    handleButtonAction('percent');
  } else if ('0123456789.'.includes(key)) {
    handleButtonAction(key);
  } else if ('+-*/'.includes(key)) {
    handleButtonAction(key);
  }
  updateDisplay();
});

updateDisplay();
