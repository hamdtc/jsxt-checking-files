const jsxl = require('jsxl');

const input = {
  numbers: [5, 10, 15, 20, 25],
  strings: ['foo', 'bar', 'baz', 'qux', 'reserved'],
  booleans: [true, false, true, false, true]
};

jsxl(
  { input },
  [
    {
      $filter:(context,num,next)=> {
        numbers: { 
          $type: Number, 
          $gte: (context, number, next) => next(null, 10), // must be greater than or equal to 10 
          $lt: (context, number, next) => next(null, 20) // must be less than 20 
        
      },
        strings: { 
          $type: String, 
          $ne: (context, str, next) => next(null, 'reserved') // must not be the string 'reserved'
        },
        booleans: { 
          $type: Boolean, 
          $eq: (context, bool, next) => next(null, true) // must be the boolean value true
        }
      }
      }
    }
  ],
  (err, output) => {
    if (err) {
      console.error(err);
    } else {
      console.log(output);
     
    }
  }
);
