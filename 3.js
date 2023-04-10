const jsxl = require('jsxl');


jsxl(
    [
        'user@example.com',
        'anotheruser@domain.com',
        'lastuser@domain.com'
      ] ,
  [
    {
      $filter: (email) => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return email;
        } else {
          throw new Error(`${email} is not a valid email address`);
        }
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
