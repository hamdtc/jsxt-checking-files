const jsxl = require('jsxl');
const input = [
  { name: 'Alice', age: '30', isEmployed: 'true', salary: '5000' },
  { name: 'Bob', age: '25', isEmployed: 'false' },
  { name: 'Charlie', age: '40', isEmployed: 'true', salary: '8000' },
  { name: 'David', age: '22', isEmployed: 'true', salary: '3000' },
];

jsxl(
  {
    input
  },
  [
    {
      $filter: (context, person, next) => {
        const isAdult = parseInt(person.age) >= 18;
        const isEmployed = person.isEmployed === 'true';
        const isHighEarner = parseInt(person.salary) >= 5000;
        next(null, isAdult && isEmployed && isHighEarner);
      },
    },
  ],
  (err, output) => {
    if (err) {
      console.error(err);
    } else {
      console.log(output);

    }
  }
);
