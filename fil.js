
 const jsxl = require('jsxl');
jsxl({
	input: {
		array1: [ { a: 1, b: 'x' } , { a: 2, b: 'y' }, { a: 3, b: 'z' } ],
		array2: [ 4, 5, 6 ],
		array3: [ 'a','b','v'],
	}},
	{ // filter
		array1: [ { a: Number }, { b: String } ],
		array2: [ Number ],
		array3: [ String ]
	}, 
	(err, output) => {
		console.log(output);
		
	}
);

