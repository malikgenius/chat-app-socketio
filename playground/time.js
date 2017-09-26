const moment = require('moment');

var date = moment();

console.log(date.format("dddd, MMMM Do YYYY, h:mm:ss a"));
// console.log(date.locale());
var age = moment([1980, 3, 9]).toNow(true);
console.log(age)

var start = moment([1980, 3, 9]);
var end = moment([2017, 9, 23]);
var totalTime = end.to(start);
console.log('Your Age ',start.to(new Date(2017, 09, 23),true))


var birthDate = moment([1980, 09, 03]).toNow();
console.log(birthDate);

var a = moment([1980, 03, 09]);
var b = moment([2017, 09, 23]);
console.log('You`r',a.to(b, true),'old');

//hour and minutes .. hour is unpadded and minutes are padded .. 
console.log(date.format('h:mm a'));
