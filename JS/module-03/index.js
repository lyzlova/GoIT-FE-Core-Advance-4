'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const isLoginValid = function(login) {
  const isValidLogin = login.length >= 4 && login.length <= 16;

  return isValidLogin;
};

const isLoginUnique = function(allLogins, login) {
  const isValidLogin = !allLogins.includes(login);

  if (isValidLogin) {
    logins.push(login);
  }

  return isValidLogin;
};

const addLogin = function(allLogins, login) {
  const resultIsLoginValid = isLoginValid(login);

  if (!resultIsLoginValid) {
    console.log('Ошибка! Логин должен быть от 4 до 16 символов');

    return;
  }

  const resultIsLoginUnique = isLoginUnique(allLogins, login);

  if (resultIsLoginUnique) {
    console.log('Логин успешно добавлен!');
  } else {
    console.log('Такой логин уже используется!');
  }

  return;
};

// // Вызовы функции для проверки
addLogin(logins, 'Ajax'); // 'Логин успешно добавлен!'
addLogin(logins, 'robotGoogles'); // 'Такой логин уже используется!'
addLogin(logins, 'Zod'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin(logins, 'jqueryisextremelyfast'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
