const jsxl = require('jsxl');

const input = {
  numbers: [5, 10, 15, 20, 25],
  strings: ['foo', 'bar', 'baz', 'qux'],
  booleans: [true, true]
};

jsxl(
  { input },
  {
    numbers: [{
      $type: Number,
      $gte: 5, // must be greater than or equal to 10 
      $lt: 30 // must be less than 20 
    }],
    strings: [{
      $type: String,
      $ne: 'reserved' // must not be the string 'reserved'
    }],
    booleans: [{
      $type: Boolean,
      $eq: true // must be the boolean value true
    }]
  },
  (err, output) => {
    if (err) {
      console.error(err);
    } else {
      console.log(output);

    }
  }
);
