'use strict';

let salesTable = document.getElementById('salesTable');
let hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

//+++++++++++++++++++++++++++++++++ Starting Store Information ++++++++++++++++++++++++++++++++++++++++++++++++

let storeNames = ['Seattle', 'Tokyo', 'Dubai', 'Paris', 'Lima'];
let minCustomers = [23, 3, 11, 20, 2];
let maxCustomers = [65, 24, 38, 38, 16];
let avgSalePerCustomer = [6.3, 1.2, 3.7, 2.3, 4.6];
let objectStoreNames = ['Seattle', 'Tokyo', 'Dubai', 'Paris', 'Lima'];

//++++++++++++++++++++++++++++++++++ Object Constructor ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function CookieStore(name, minCust, maxCust, avgSale){
  this.customersEachHour = [];
  this.cookieSalesEachHour = [];
  this.cookieSalesTotal = 0;
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.render();
}

// Create random number of customers and push to customersEachHour array
CookieStore.prototype.createRandomNumberOfCustomers = function(){
  for(let i = 0; i < hours.length; i++){
    this.customersEachHour.push( Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
  }
};

// calculate cookie sales each hour and push to cookieSalesEachHour array
CookieStore.prototype.populateCookieSalesEachHour = function(){
  this.createRandomNumberOfCustomers();
  for(let i = 0; i < hours.length; i++){
    this.cookieSalesEachHour.push(Math.ceil(this.customersEachHour[i] * this.avgSale));
    this.cookieSalesTotal += this.cookieSalesEachHour[i];
  }
};
// render method: creates the elements and populates them. Also calls the method that calculates the cookie hours
CookieStore.prototype.render = function (){
  this.populateCookieSalesEachHour();
  let trEl = document.createElement('tr');
  let tdEl = document.createElement('td');
  tdEl.textContent = this.name;
  trEl.appendChild(tdEl);
  for(let i = 0; i < hours.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookieSalesEachHour[i];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = this.cookieSalesTotal;
  trEl.appendChild(tdEl);
  salesTable.appendChild(trEl);
};

//++++++++++++++++++++++++++++++++ Function Declarations +++++++++++++++++++++++++++++++++++++++++++++++

let header = function() {
  let trEl = document.createElement('tr');
  let thEl = document.createElement('th');
  thEl.textContent = 'Store Names';
  trEl.appendChild(thEl);
  for(let i = 0; i < hours.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Totals:';
  trEl.appendChild(thEl);
  salesTable.appendChild(trEl);
};

// createStores function takes the data from the arrays and builds a new store object constructor
let createStores = function(){
  header(); // calls the header first so it appears on the top row
  for (let i = 0; i < storeNames.length; i++){
    objectStoreNames[i] = new CookieStore(storeNames[i], minCustomers[i], maxCustomers[i], avgSalePerCustomer[i]);
  }
};
createStores()

// hourlyTotal function totals the hourly sales for all of the stores over each hour
let hourlyTotal = function() {
  let trEl = document.createElement('tr');
  let tdEl = document.createElement('td');
  tdEl.textContent = 'Hourly Totals';
  trEl.appendChild(tdEl);
  for(let i = 0; i < hours.length; i++){
    let sumUpHourlySales = 0;
    tdEl = document.createElement('td');
    for(let j = 0; j < objectStoreNames.length; j++){
      sumUpHourlySales += objectStoreNames[j].cookieSalesEachHour[i];
      tdEl.textContent = sumUpHourlySales;
    }
    trEl.appendChild(tdEl);
  }
  salesTable.appendChild(trEl);
};
hourlyTotal();


