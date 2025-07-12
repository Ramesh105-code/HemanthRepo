
const boxen = require('boxen');

const title = "Hurray!!!";
const message = "I am using my first external module!";

const box1 = boxen(message, {
  title: title,
  padding: 1,
  margin: 1,
  borderStyle: "classic"
});

const box2 = boxen(message, {
  title: title,
  padding: 1,
  margin: 1,
  borderStyle: "singleDouble"
});

const box3 = boxen(message, {
  title: title,
  padding: 1,
  margin: 1,
  borderStyle: "round"
});

console.log(box1);
console.log(box2);
console.log(box3);
