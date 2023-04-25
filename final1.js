const jsxl = require("jsxl");

const data = {
  users: {
    firstUser: {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "124050",
      },
    },
    secondUser: {
      name: "Jane Smith",
      age: 25,
      email: "janesmith@example.com",
      address: {
        street: "456 Oak St",
        city: "Sometown",
        state: "NY",
        zip: "678900",
      },
    },
  },
  products: {
    1: {
      id: 1,
      name: "Product A",
      price: 19.99,
      description: "This is product A",
    },
    second: {
      id: 2,
      name: "Product B",
      price: 29.99,
      description: "This is product B",
    },
    third: {
      id: 3,
      name: "Product C",
      price: 39.99,
      description: "This is product C",
    },
  },
};

const userReference = (context, key, next) => {
  if (context.key === "name") return next();
  if (key in context) return next();
  next(`is an invalid user reference (${key})`);
};

const productName = (context, key, next) => {
  if (key.match(/^[A-Za-z\s]+$/)) return next();
  next(`is an invalid product name (${key})`);
};

const productId = (context, id, next) => {
  console.log(context);
  if (Number.isInteger(id)) return next();
  next(`is an invalid product id (${id})`);
};

const productPrice = (context, price, next) => {
  if (typeof price === "number" && price > 0) return next();
  next(`is an invalid product price (${price}) `);
};

const checkZip = (context, zip, next) => {
  if (zip.length >= 6 && zip[0] !== "0") return next();
  next(`is an invalid zip number (${zip})`);
};
const productDescription = (context, description, next) => {
  if (description.length <= 100) return next();
  next(`is an invalid product description (${description})`);
};

const validStates = ["CA", "NY", "TX"];

jsxl(
  {
    data,
  },
  {
    users: {
      $: {
        name: { $type: String, $transform: userReference },
        age: { $optional: true, $type: Number, $gt: 18 },
        email: { $type: String },
        address: {
          street: { $type: String },
          city: { $type: String },
          state: { $type: String, $in: validStates },
          zip: { $type: String, $transform: checkZip },
        },
      },
    },
    products: {
      $: {
        $key: {
          $transform: (context, key, next) => {
            key.match(/^[a-z]+$/) ? next(null, true) : next("invalid key");
          },
        },
        $type: {
          id: { $type: Number, $transform: productId },
          name: { $type: String, $transform: productName },
          price: { $transform: productPrice },
          description: {
            $optional: true,
            $type: String,
            $transform: productDescription,
          },
        },
      },
    },
  },

  (err, output) => {
    if (err) {
      console.error(err);
    } else {
      console.log(output);
    }
  }
);
