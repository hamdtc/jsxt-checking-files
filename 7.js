const jsxl = require('jsxl');
jsxl(
  {
    input: ['a', 'skip', 'b', 'skip', 'c', 'hello', 'world', 'ab', 'xyz', 'this', 'is', 'a', 'test', 'Test']
  },
  [{
    $filter: (context, value, next) => {
      next(null, (value !== 'skip') && value.includes('a') )
      
    },
    // $filter: (context, value, next) => {
    //         next(null, value.includes('a'));
    //       },
    $any:[ String],
    
     $transform: (context, value, next) => {
      next(null, (value + 'b').toUpperCase());
   },       
  }],
  (err, output) => {
    if (err) {
      console.error(err);
    } else {
      console.log(output);
    }
  }
);
