'use strict';

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let userInput;
let attempts = 3;
let isRange;

do {
  userInput = prompt(`Ввести свой пароль`);
  isRange = passwords.includes(userInput);

  if (isRange) {
    alert('Добро пожаловать!');
    break;
  } else {
    attempts -= 1;
    alert(`Неверный пароль, у вас осталось ${attempts} попыток`);
  }

  if (attempts === 0) {
    alert(`У вас закончились попытки, аккаунт заблокирован!`);
  }
} while (userInput !== null && attempts !== 0);
