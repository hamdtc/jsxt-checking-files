const jsxl = require('jsxl');


jsxl(
  {
    input: ['a', 'skip', 'b', 'skip', 'c']
  },
  [{
    $type: String,
    $transform: (context, value, next) => {
        
        console.log(context.key);
      if (value === 'skip') {
        delete context.source[context.key]
        // context.$remove = true;
      } else {
        context.$insert = value;
      }
      next();
    }

  }],
  (err, output) => {
    if (err) {
      console.error(err);
    } else {
      console.log(output);
    }
  }
);
