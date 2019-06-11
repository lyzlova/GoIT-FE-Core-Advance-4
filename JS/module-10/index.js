'use strict';

/*
  Написать приложение для работы с REST сервисом, все функции делают запрос и 
  возвращают Promise с которым потом можно работать. 
  
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

// Реализовать следующий функционал:
/*1. функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.*/

const btnAllUsers = document.querySelector('.js-get-all-users');
const listAllUsers = document.querySelector('.js-AllUsers');
let isActive = true;

btnAllUsers.addEventListener('click', handleAllUsers);

function handleAllUsers(event) {
  if (event.target.nodeName === 'BUTTON' && isActive === true) {
    isActive = false;

    const getAllUsers = () => {
      return fetch('https://test-users-api.herokuapp.com/users/').then(
        response => {
          if (response.ok) return response.json();

          throw new Error(response.statusText);
        },
      );
    };

    return getAllUsers().then(data => showAllUsers(data));
  }
}

function showAllUsers(data) {
  const arrUsers = data.data;
  const createCart = arrUsers.reduce(
    (markup, obj) =>
      markup + `<li> id: ${obj.id}, name: ${obj.name}, age: ${obj.age} </li>`,
    '',
  );
  listAllUsers.insertAdjacentHTML('afterbegin', createCart);
}

/* 2. функция getUserById(id) - должна вернуть пользователя с переданным id.*/

const formUsersById = document.querySelector('.js-users-by-id');
const inputUsersById = document.querySelector('.js-put-id');
const listUserById = document.querySelector('.js-usersById');

formUsersById.addEventListener('click', getValue);

function getValue(event) {
  event.preventDefault();

  if (event.target.nodeName === 'BUTTON') {
    let inputValue = inputUsersById.value;

    const getUserById = id => {
      return fetch(`https://test-users-api.herokuapp.com/users/${id}`).then(
        response => {
          if (response.ok) return response.json();

          throw new Error(response.statusText);
        },
      );
    };

    return getUserById(inputValue)
      .then(data => showUserById(data))
      .catch(error => showUserById(error));
  }
}

function showUserById(data) {
  const arrUsers = data.data;

  if (data.status === 200) {
    let user = `<li> id: ${arrUsers.id}, name: ${arrUsers.name}, age: ${
      arrUsers.age
    } </li>`;
    listUserById.insertAdjacentHTML('afterbegin', user);
  } else {
    let user = `<li><p>Error: Enter valid id</p></li>`;
    listUserById.insertAdjacentHTML('afterbegin', user);
  }
}

// 3. функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
const formAddUser = document.querySelector('.js-form-add-user');
const inputAddName = document.querySelector('.js-add-name');
const inputAddAge = document.querySelector('.js-add-age');
let isAddUser = true;

formAddUser.addEventListener('click', handleAddUser);

function handleAddUser(event) {
  event.preventDefault();

  if (event.target.nodeName === 'BUTTON' && isAddUser === true) {
    let isAddUser = false;

    const addUser = (name, age) => {
      const createUser = {
        name: name,
        age: age,
      };

      return fetch(`https://test-users-api.herokuapp.com/users/`, {
        method: 'POST',
        body: JSON.stringify(createUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(response => {
        if (response.ok) return response.json();

        throw new Error(response.statusText);
      });
    };

    return addUser(inputAddName.value, inputAddAge.value)
      .then(data => showAdd(data))
      .catch(error => showAdd(error));
  }
}

function showAdd(data) {
  const arrUsers = data.data;
  console.log(data);

  if (data.status === 201) {
    alert('Пользователь добавлен');
  } else {
    alert('Извините ошибка. Проверьте введенные данные');
  }
}

// // 4.  функция removeUser(id) - должна удалять из БД юзера по указанному id.
const formRemoveUser = document.querySelector('.js-form-remove-user');
const inputRemoveUser = document.querySelector('.js-remove-id');
let isRemoveUser = true;

formRemoveUser.addEventListener('click', removeUser);

function removeUser(event) {
  event.preventDefault();

  if (event.target.nodeName === 'BUTTON' && isRemoveUser === true) {
    isRemoveUser = false;
    let inputValue = inputRemoveUser.value;

    const removeUserById = id => {
      return fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
        method: 'DELETE',
      }).then(response => {
        if (response.ok) return response.json();

        throw new Error(response.statusText);
      });
    };

    return removeUserById(inputValue)
      .then(data => showRemoveUser(data))
      .catch(error => showRemoveUser(data));
  }
}

function showRemoveUser(data) {
  const arrUsers = data.dshowRemoveUserata;
  console.log(data);

  if (data.status === 200) {
    alert('Пользователь удален');
  } else {
    alert('Извините ошибка. Проверьте введенные данные');
  }
}

// // 5. функция updateUser(id, user) - должна обновлять данные пользователя по id.
// // user это объект с новыми полями name и age.

const formUpdateUser = document.querySelector('.js-form-update-user');
const inputUpdateName = document.querySelector('.js-update-name');
const inputUpdateAge = document.querySelector('.js-update-age');
const inputUpdateId = document.querySelector('.js-update-id');
let isUpdateUser = true;

formUpdateUser.addEventListener('click', handleUpdateUser);

function handleUpdateUser(event) {
  event.preventDefault();

  if (event.target.nodeName === 'BUTTON' && isUpdateUser === true) {
    let isUpdateUser = false;

    const updateUser = (id, name, age) => {
      const createUser = {
        name: name,
        age: age,
      };

      return fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(createUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(response => {
        if (response.ok) return response.json();

        throw new Error(response.statusText);
      });
    };

    return updateUser(
      inputUpdateId.value,
      inputUpdateName.value,
      inputUpdateAge.value,
    )
      .then(data => showUpdateUser(data))
      .catch(error => showUpdateUser(error));
  }
}

function showUpdateUser(data) {
  const arrUsers = data.data;
  console.log(data);

  if (data.status === 200) {
    alert('Пользователь обновлен');
  } else {
    alert('Извините ошибка. Проверьте введенные данные');
  }
}
