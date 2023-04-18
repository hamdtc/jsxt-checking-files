const jsxl = require('jsxl');

let input = [
  'h',
  { name: 'Charlie', age: '40', isEmployed: 'true', salary: '8000' },
  { name: 'David', age: '22', isEmployed: 'true', salary: '3000' },
  2, 3, 'a', 'skip', 'b', 'skip', 'c', 'hello' ,true,false
];


jsxl.useFilters({
  screenTypes: [{
    $any: [Object, Number, String,Boolean],
    $transform: (context, value, next) => {
      let result = {
        obj: [],
        str: [],
        num: [],
        boo: [],
      };
      switch (typeof value) {
        case 'object':
          result.obj.push(value);
          break;
        case 'number':
          result.num.push(value);
          break;
        case 'string':
          result.str.push(value);
          break;
        case 'boolean':
          result.boo.push(value);
          break;
        default:
          break;
      }
      next(null, result);
    }
  }]
});

jsxl(
  { input },
  "screenTypes",
  (err, output) => {
    if (err) {
      console.error(err);
    } else {
      let finalResult = {
        obj: [],
        str: [],
        num: [],
        boo: [],
      };
      output.forEach(result => {
        
        finalResult.boo = finalResult.boo.concat(result.boo);
        finalResult.obj = finalResult.obj.concat(result.obj);
        finalResult.str = finalResult.str.concat(result.str);
        finalResult.num = finalResult.num.concat(result.num);
      });
      console.log(finalResult);
    }
  }
);
