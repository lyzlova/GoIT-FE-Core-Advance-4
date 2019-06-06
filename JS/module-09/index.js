'use strict';
/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен. 
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

const stopwatch = document.querySelector('.stopwatch');
const clockface = document.querySelector('.js-time');
const startBtn = document.querySelector('.js-start');
const takeLapBtn = document.querySelector('.js-take-lap');
const resetBtn = document.querySelector('.js-reset');
const laps = document.querySelector('.js-laps');

class Stopwatch {
  constructor({ onTick, addList }) {
    this.startTime = null;
    this.deltaTime = null;
    this.timerId = null;
    this.active = false;
    this.onTick = onTick;
    this.addList = addList;
  }

  start() {
    if (this.active) return;

    this.active = true;
    this.startTime = Date.now() - this.deltaTime;

    this.timerId = setInterval(() => {
      this.deltaTime = Date.now() - this.startTime;
      this.onTick(this.deltaTime);
    }, 100);
  }

  stop() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.active = false;
  }

  reset() {
    this.stop();
    this.startTime = 0;
    this.deltaTime = 0;
    this.onTick(this.deltaTime);
  }

  lap() {
    this.addList(this.deltaTime);
  }
}

const watch = new Stopwatch({ onTick: updateClockface, addList: addList });

startBtn.addEventListener('click', () => {
  if (!watch.active) {
    watch.start();
    resetBtn.disabled = false;
    startBtn.textContent = 'Pause';

    return;
  }
  watch.stop();
  startBtn.textContent = 'Continue';
});

resetBtn.addEventListener('click', () => {
  startBtn.textContent = 'Start';
  watch.reset();
  resetBtn.disabled = true;
  laps.innerHTML = '';
});

takeLapBtn.addEventListener('click', () => {
  watch.lap();
});

function updateClockface(time) {
  let timeNew = new Date(time);
  let min = timeNew.getMinutes();
  let sec = timeNew.getSeconds();
  let ms = Number.parseInt(timeNew.getMilliseconds() / 100);

  min < 10 ? (min = '0' + min) : min;
  sec < 10 ? (sec = '0' + sec) : sec;
  return (clockface.textContent = `${min}:${sec}.${ms}`);
}

function addList(time) {
  const timeLaps = time;
  const aa = updateClockface(timeLaps);

  const arrLaps = [];
  arrLaps.push(aa);
  const createList = document.createElement('li');
  createList.classList.add('.list-lap');
  laps.append(createList);
  createList.textContent = arrLaps;
}
