const jsxl = require('jsxl');
var even = [];
var odd = [];
jsxl.useFilters({
  EvenOdd: [{
    $type: Number,
    $transform: (context, number, next) => {
      

      if (number % 2 === 0) {
        even.push(number);
      } else {
        odd.push(number);
      }

    console.log(even);
    console.log(odd);
      next();
    }
  }]
});

jsxl({
  input: [1, 2, 3, 4, 5, 6]
}, "EvenOdd", (err, output) => {
  if (err) {
    console.error(err);
  } else {
    console.log(output);

  }
});
