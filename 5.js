const jsxl = require('jsxl');

const input = {
  delivery: 'express'
};

jsxl(
  { input },
  {
    delivery: {
      $type: String,
      $map: { express: 'watsapp', priority: 'text message', batch: 'email' },
      $default: 'batch',
    }
  },
  (err, output) => {
    if (err) {
      console.error(err);
    } else {
      console.log(output);
    }
  }
);
