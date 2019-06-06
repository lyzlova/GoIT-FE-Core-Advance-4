'use strict';

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40,
};

function Cashier(name, products, customerMoney) {
  this.name = name;
  this.productDatabase = products;
  this.customerMoney = 0;
  this.totalPrice = 0;
  this.change = 0;
  this.setCustomerMoney = function(value) {
    this.customerMoney = value;

    return this.customerMoney;
  };
  this.countTotalPrice = function(order) {
    for (let key in order) {
      const hasProducts = this.productDatabase.hasOwnProperty(key);
      if (hasProducts) {
        this.totalPrice += order[key] * this.productDatabase[key];
      }
    }

    return this.totalPrice;
  };
  this.countChange = function(totalPrice) {
    if (this.customerMoney >= this.totalPrice) {
      this.change = this.customerMoney - this.totalPrice;
      this.onSuccess();
      return this.change;
    } else {
      this.onError();
      return null;
    }
  };
  this.onSuccess = function(change) {
    console.log(`Спасибо за покупку, ваша сдача ${this.change}!`);
    this.reset();
  };
  this.onError = function() {
    console.log('Очень жаль, вам не хватает денег на покупки');
    this.reset();
  };
  this.reset = function() {
    return (
      (this.totalPrice = 0), (this.customerMoney = 0), (this.changeAmount = 0)
    );
  };
}

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1,
};

const mango = new Cashier('Mango', products);
console.log(mango.name); // Mango
console.log(mango.productDatabase); // ссылка на базу данных продуктов (объект products)
console.log(mango.customerMoney); // 0
const totalPrice = mango.countTotalPrice(order);
console.log(totalPrice); // 110
mango.setCustomerMoney(300);
console.log(mango.customerMoney); // 300
const change = mango.countChange();
console.log(change); // 190
mango.reset();
console.log(mango.customerMoney); // 0
