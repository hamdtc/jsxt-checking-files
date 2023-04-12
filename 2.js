const jsxl = require('jsxl');

// jsxl.useFilters({
//   EvenOdd: {
//     $type: [Number],
//     $transform: (context, numbers, next) => {
//       let result = {
//         even: [],
//         odd: []
//       };
//       numbers.map(n => (n % 2 == 0) ? result.even.push(n) : result.odd.push(n));
//       next(null, result);
//     }
//   }
// });

jsxl.useFilters({
  EvenOdd: [{
    // $filter: (context, number, next) => {
    //   next(null, (number % 2 === 0))
    // },
    $type: Number,
    $transform: (context, number, next) => {
      next(null, (number % 2 === 0) ? number * 2 : undefined);
    },
    $remove: (context, number, next) => next(null, (number % 2 === 0))
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

// {
//   odd: [1, 3, 5]
//   even: [2, 4, 6]
// }

// var even = [];
// var odd = [];
// jsxl.useFilters({
//   EvenOdd: [{
//     $type: Number,
//     $transform: (context, number, next) => {


//       if (number % 2 === 0) {
//         even.push(number);
//       } else {
//         odd.push(number);
//       }

//       console.log(even);
//       console.log(odd);
//       next();
//     }
//   }]
// });

// jsxl({
//   input: [1, 2, 3, 4, 5, 6]
// }, "EvenOdd", (err, output) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(output);

//   }
// });