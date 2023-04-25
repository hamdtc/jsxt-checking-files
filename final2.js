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
    first: {
      id: 1,
      name: "product A",
      price: 19.99,
      category: "small",
      description: "This is product A",
    },
    second: {
      id: 2,
      name: "product B",
      price: 29.99,
      category: "small",
      description: "This is product B",
    },
    third: {
      id: 3,
      name: "product C",
      price: 39.99,
      category: "large",
      description: "This is product C",
    },
  },
};

var store = {
  food: {
    fruit: {
      first: {
        "product A": ["small", "medium", "large"],
        "product B": ["small", "medium", "large", "extra"],
        "product C": ["medium", "large"],
      },
      second: {
        "product A": ["small", "medium", "large"],
        "product B": ["small", "medium", "large", "extra"],
        "product C": ["medium", "large"],
      },
      third: {
        "product A": ["small", "medium", "large"],
        "product B": ["small", "medium", "large", "extra"],
        "product C": ["medium", "large"],
      },
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

const categoryAvailable = (context, value, next) => {
  if (value === undefined) return next();
  const storeCategories = store.food.first;
  if (storeCategories === undefined) {
    return next(new Error(`No products found for category ${context.key}`));
  }
  if (storeCategories.includes(value)) {
    return next(null, value);
  }
  return next(
    new Error(
      `Product ${context.context.parent.name} is not available in ${context.context.key} category`
    )
  );
};

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
          state: { $type: String },
          zip: { $type: String, $transform: checkZip },
        },
      },
    },
    products: {
      $: {
        id: { $type: Number, $transform: productId },
        name: { $type: String, $transform: productName },
        price: { $transform: productPrice },
        category: {
          $type: String,
          $match: categoryAvailable,
          $transform: (context, value, next) => {
            if (value === "small") return next(null, "s");
            if (value === "medium") return next(null, "m");
            if (value === "large") return next(null, "l");
            next(null, value);
          },
        },
        description: {
          $optional: true,
          $type: String,
          $transform: productDescription,
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
