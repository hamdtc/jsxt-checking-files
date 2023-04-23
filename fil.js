
 const jsxl = require('jsxl');
// jsxl({
// 	input: {
// 		array1: [ { a: 1, b: 'x' } , { a: 2, b: 'y' }, { a: 3, b: 'z' } ],
// 		array2: [ 4, 5, 6 ],
// 		array3: [ 'a','b','v'],
// 	}},
// 	{ // filter
// 		array1: [ { a: Number }, { b: String } ],
// 		array2: [ Number ],
// 		array3: [ String ]
// 	}, 
// 	(err, output) => {
// 		console.log(output);
		
// 	}
// );

const input = [
  { number: 7 },
  { number: 'a' },
  { number: 9 }
];

const schema = [
  {
    $type: Number,
    $transform: (context, value, next) => {
      if (typeof value === 'number') {
        next(null, value);
      } else {
        next(null, undefined);
      }
    }
  }
];

jsxl(input, schema, (err, output) => {
  if (err) {
    console.error(err);
  } else {
    console.log(output);
    // output: [{ number: 7}, {number: 9}]
  }
});

