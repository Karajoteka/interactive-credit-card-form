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

  const userName = userNameInput.value;
  const cardNumber = cardNumberInput.value;
  let month = monthInput.value;
  const year = yearInput.value;
  const cvc = cvcInput.value;

  const currentYear = new Date().getFullYear() % 100;

  function showError(messageElement, message) {
    messageElement.textContent = message;
    messageElement.classList.remove('inactive');
    if (messageElement.inputElement) {
      messageElement.inputElement.style.borderColor = 'hsl(0, 100%, 66%)';
    }
  }

  function hideErrors() {
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

  hideErrors();

  // Validación para userName
  if (userName === '') {
    showError(emptyMessage[0], 'Can´t be blank');
  } else if (!/^[A-Za-z\s]+$/.test(userName)) {
    showError(wrongName, 'Wrong format, letters only');
  }

  // Validación para cardNumber
  if (cardNumber === '') {
    showError(emptyMessage[1], 'Can´t be blank');
  } else if (!/^\d{4}(\s\d{4}){3}$/.test(cardNumber)) {
    showError(wrongNumber, 'Wrong format, numbers only');
  }

  // Validación para month
  if (month === '') {
    showError(emptyMessage[2], 'Can´t be blank');
  } else if (!/^(0?[1-9]|1[0-2])$/.test(month)) {
    showError(wrongFormat[0], 'Wrong format');
  }

  // Validación para year
  if (year === '') {
    showError(emptyMessage[3], 'Can´t be blank');
  } else if (parseInt(year) < currentYear) {
    showError(wrongFormat[1], 'Wrong format');
  }

  // Validación para cvc
  if (cvc === '') {
    showError(emptyMessage[4], "Can't be blank");
  } else if (!/^\d{3}$/.test(cvc)) {
    showError(wrongFormat[2], 'Wrong format');
  }
}

    // Ocultar todos los mensajes de error si no hay problemas
    // if (
    //   userName !== '' &&
    //   /^[A-Za-z]+$/.test(userName) &&
    //   cardNumber !== '' &&
    //   /^\d{4}(\s\d{4}){3}$/.test(cardNumber) &&
    //   month !== '' &&
    //   /^(0?[1-9]|1[0-2])$/.test(month) &&
    //   year !== '' &&
    //   parseInt(year) >= currentYear &&
    //   cvc !== ''
    // ) {
    //   hideErrors();
    // } 
  
    
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

