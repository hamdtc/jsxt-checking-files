const jsxl = require('jsxl');
jsxl({
  input: ['user@example.com', 'anotheruser@domain.com', 'lastuser@domain.com', null]
},
  [
    {
      $type: String,
      $transform: (context, email, next) => {
        next(null, (email && email.constructor === String) ? email.match("/^[^\s@]+@[^\s@]+\.[^\s@]+$/") : next(`invalid ${email}`))
      }
    }
  ],
  (err, output) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(output);

    }
  }
);

