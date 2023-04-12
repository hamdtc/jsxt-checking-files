const jsxl = require('jsxl');


jsxl(
  {
    input: ['a', 'skip', 'b', 'skip', 'c']
  },
  [{
    $filter: (context, value, next) => {
      next(null, (value !== 'skip'))
    },
    $type: String
  }],
  (err, output) => {
    if (err) {
      console.error(err);
    } else {
      console.log(output);
    }
  }
);
