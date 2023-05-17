const userNameInput = document.querySelector('#user-name');
const cardNumberInput = document.querySelector('#card-number');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const cvcInput = document.querySelector('#cvc');

const emptyMessage = document.querySelectorAll('.empty-error');
const wrongFormat = document.querySelectorAll('.wrong-format');
const wrongName = document.querySelector('.wrong-name');
const wrongNumber = document.querySelector('.wrong-number');

const printedName = document.querySelector('.printed-name');
const printednumbers = document.querySelector('.printed-numbers');
const printedDate = document.querySelector('.printed-date');
const printedCvc = document.querySelector('.printed-cvc');

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', submitForm);

const completedForm = document.querySelector('.complete');
const restart = document.querySelector('.restart-button');
restart.addEventListener('click', restartForm);

monthInput.addEventListener('input', function() {
  const enteredMonth = monthInput.value;

  if (enteredMonth.lenght === 1 && /^[1-9]$/.test(enteredMonth)) {
    monthInput.value = '0' + enteredMonth;
  }
});

cardNumberInput.addEventListener('input', function (event) {
  const value = event.target.value;
  const formattedValue = formatCardNumber(value);
  event.target.value = formattedValue;
});

function formatCardNumber(value) {
  //Eliminar todos los espacios en blanco del valor actual
  const currentValue = value.replace(/\s/g, '');
  // Dividir el valor en grupos de cuatro caracteres
  const groups = currentValue.match(/.{1,4}/g);
  // Unir los grupos con espacios en blanco
  const formattedValue = groups ? groups.join(' ') : '';

  return formattedValue;
}

function submitForm(event) {
  event.preventDefault();

  userNameInput.addEventListener('blur', validateUserName);
  cardNumberInput.addEventListener('blur', validateCardNumber);
  monthInput.addEventListener('blur', validateMonth);
  yearInput.addEventListener('blur', validateYear);
  cvcInput.addEventListener('blur', validateCvc);

  validateUserName();
  validateCardNumber();
  validateMonth();
  validateYear();
  validateCvc();

  function validateUserName() {
    const userName = userNameInput.value;

    if (userName === '') {
      showError(emptyMessage[0], 'Can´t be blank');
    } else if (!/^[A-Za-z\s]+$/.test(userName)) {
      showError(wrongName, 'Wrong format, letters only');
    } else {
      hideError(emptyMessage[0]);
      hideError(wrongName);
    }
  }

  function validateCardNumber() {
    const cardNumber = cardNumberInput.value;

    if (cardNumber === '') {
      showError(emptyMessage[1], 'Can´t be blank');
    } else if (!/^\d{4}(\s\d{4}){3}$/.test(cardNumber)) {
      showError(wrongNumber, 'Wrong format, numbers only');
    } else {
      hideError(emptyMessage[1]);
      hideError(wrongNumber);
    }
  }

  function validateMonth() {
    const month = monthInput.value;

    if (month === '') {
      showError(emptyMessage[2], 'Can´t be blank');
    } else if (!/^(0?[1-9]|1[0-2])$/.test(month)) {
      showError(wrongFormat[0], 'Wrong format');
    } else {
      hideError(emptyMessage[2]);
      hideError(wrongFormat[0]);
    }
  }

  function validateYear() {
    const year = yearInput.value;
    const currentYear = new Date().getFullYear() % 100;

    if (year === '') {
      showError(emptyMessage[3], 'Can´t be blank');
    } else if (parseInt(year) < currentYear) {
      showError(wrongFormat[1], 'Wrong format');
    } else {
      hideError(emptyMessage[3]);
      hideError(wrongFormat[1]);
    }
  }

  function validateCvc() {
    const cvc = cvcInput.value;

    if (cvc === '') {
      showError(emptyMessage[4], "Can't be blank");
    } else if (!/^\d{3}$/.test(cvc)) {
      showError(wrongFormat[2], 'Wrong format');
    } else {
      hideError(emptyMessage[4]);
      hideError(wrongFormat[2]);
    }
  }

  function showError(messageElement, message) {
    messageElement.textContent = message;
    messageElement.classList.remove('inactive');
    if (messageElement.inputElement) {
      messageElement.inputElement.style.borderColor = 'hsl(0, 100%, 66%)';
    }
  }

  function hideError() {
    emptyMessage.forEach(message => {
      message.textContent = '';
      message.classList.add('inactive');
      if (message.inputElement) {
        message.inputElement.style.borderColor = '';
      }
    });
    wrongFormat.forEach(message => {
      message.textContent = '';
      message.classList.add('inactive');
    });
    wrongName.textContent = '';
    wrongName.classList.add('inactive');
    wrongNumber.textContent = '';
    wrongNumber.classList.add('inactive');
  }

  const isValid =
    userNameInput.value !== '' &&
    /^[A-Za-z\s]+$/.test(userNameInput.value) &&
    cardNumberInput.value !== '' &&
    /^\d{4}(\s\d{4}){3}$/.test(cardNumberInput.value) &&
    monthInput.value !== '' &&
    /^(0?[1-9]|1[0-2])$/.test(monthInput.value) &&
    yearInput.value !== '' &&
    parseInt(yearInput.value) >= new Date().getFullYear() % 100 &&
    cvcInput.value !== '' &&
    !document.querySelector('.error:not(.inactive)');

  if (isValid) {
    completedForm.classList.remove('inactive');
    document.querySelector('.form-container').classList.add('inactive');
  }
}

submitButton.addEventListener('click', function(event) {
  submitForm(event);
});

function restartForm() {
  completedForm.classList.add('inactive');
  document.querySelector('.form-container').classList.remove('inactive');

  hideError();
  location.reload();  
}

restart.addEventListener('click', function() {
  location.reload();
});

function printCard() {

  userNameInput.addEventListener('blur', function() {
    const userName = userNameInput.value.toUpperCase();
    printedName.textContent = userName;
  });
  
  cardNumberInput.addEventListener('blur', function() {
    printednumbers.textContent = cardNumberInput.value;
  });

  function updateDateOutput() {
    const month = monthInput.value;
    const year = yearInput.value;
    printedDate.textContent = formatMonth(month) + '/' + year;
  }

  function formatMonth(month) {
    if (month.length === 1) {
      return '0' + month;
    }
    return month;
  }

  monthInput.addEventListener('blur', updateDateOutput);
  yearInput.addEventListener('blur', updateDateOutput);

  cvcInput.addEventListener('blur', function() {
    printedCvc.textContent = cvcInput.value;
  });
}

printCard();



