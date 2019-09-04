//DinnerModel class
class DinnerModel {
  constructor() {
    this.dishes = dishesConst;
    this.GROUP_ID = 16;
    this.API_KEY = config.SECRET_API_KEY;
    this.baseURLRecipes =
      "http://sunset.nada.kth.se:8080/iprog/group/" +
      this.GROUP_ID +
      "/recipes/";
    //TODO Lab 0
    // implement the data structure that will hold number of guests
    // and selected dishes for the dinner menu
    this.numberOfGuests = 10;
    this.menuDishes = [];
  }

  setNumberOfGuests(num) {
    //TODO Lab 0
    if (num >= 0) {
      this.numberOfGuests = num;
    }
  }

  getNumberOfGuests() {
    //TODO Lab 0
    return this.numberOfGuests;
  }

  //Returns the dish that is on the menu for selected type
  getSelectedDish(type) {
    //TODO Lab 0
    for (let dish of this.menuDishes) {
      if (dish.type === type) {
        return dish;
      }
    }
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    //TODO Lab 0
    return this.menuDishes;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    //TODO Lab 0
    let allIngredients = [];
    for (let dish of this.menuDishes) {
      allIngredients = allIngredients.concat(dish.ingredients);
    }
    return allIngredients;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  getTotalMenuPrice() {
    //TODO Lab 0
    let totalPrice = 0;
    const allIngredients = this.getAllIngredients();
    for (let ingredient of allIngredients) {
      totalPrice +=
        ingredient.price * ingredient.quantity * this.getNumberOfGuests();
    }
    return totalPrice;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  addDishToMenu(data) {
    //TODO Lab 0
    const inputDish = data;
    if (inputDish !== undefined) {
      const filteredMenuDishes = [];
      for (let dish of this.menuDishes) {
        if (inputDish.type !== dish.type) {
          filteredMenuDishes.push(dish);
        }
      }
      filteredMenuDishes.push(inputDish);
      this.menuDishes = filteredMenuDishes;
    }
  }

  //Removes dish from menu
  removeDishFromMenu(id) {
    //TODO Lab 0
    var newMenuDishes = [];

    for (let dish of this.menuDishes) {
      if (dish.id !== id) {
        newMenuDishes.push(dish);
      }
    }

    this.menuDishes = newMenuDishes;
  }

  handleHTTPError(response) {
    if (response.ok) return response;
    throw Error(response.statusText);
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {
    document.getElementById("loader").style.display = "block";
    const URL = this.baseURLRecipes + "search";

    let queryToInclude = "";

    if (type == undefined) {
      if (query !== undefined) {
        queryToInclude = "?query=" + query;
      }
    } else {
      queryToInclude = "?type=" + type;
      if (query !== undefined) {
        queryToInclude = queryToInclude + "&query=" + query;
      }
    }

    let URLWithParams = URL + queryToInclude;

    return fetch(URLWithParams, {
      method: "GET",
      headers: {
        "X-Mashape-Key": this.API_KEY
      }
    })
      .then(this.handleHTTPError)
      .then(response =>
        response.json().then(data => {
          document.getElementById("loader").style.display = "none";
          return data.results;
        })
      )
      .catch(err => console.log(err));
  }

  handleHTTPErrorGetDish(response) {
    if (response.ok) {
      return response.json().then(object => object);
    } else {
      return { code: response.status };
    }
  }
  //Returns a dish of specific ID
  getDish(id) {
    document.getElementById("loader").style.display = "block";
    const URL = this.baseURLRecipes + id + "/information";

    return fetch(URL, {
      method: "GET",
      headers: {
        "X-Mashape-Key": this.API_KEY
      }
    })
      .then(this.handleHTTPErrorGetDish)
      .then((document.getElementById("loader").style.display = "none"))
      .catch(console.error);
  }
}

// the dishes constant contains an array of all the
// dishes in the database. Each dish has id, name, type,
// image (name of the image file), description and
// array of ingredients. Each ingredient has name,
// quantity (a number), price (a number) and unit (string
// defining the unit i.e. "g", "slices", "ml". Unit
// can sometimes be empty like in the example of eggs where
// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
const dishesConst = [
  {
    id: 1,
    name: "French toast",
    type: "starter",
    image: "toast.jpg",
    description:
      "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
    ingredients: [
      {
        name: "eggs",
        quantity: 0.5,
        unit: "",
        price: 10
      },
      {
        name: "milk",
        quantity: 30,
        unit: "ml",
        price: 6
      },
      {
        name: "brown sugar",
        quantity: 7,
        unit: "g",
        price: 1
      },
      {
        name: "ground nutmeg",
        quantity: 0.5,
        unit: "g",
        price: 12
      },
      {
        name: "white bread",
        quantity: 2,
        unit: "slices",
        price: 2
      }
    ]
  },
  {
    id: 2,
    name: "Sourdough Starter",
    type: "starter",
    image: "sourdough.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "active dry yeast",
        quantity: 0.5,
        unit: "g",
        price: 4
      },
      {
        name: "warm water",
        quantity: 30,
        unit: "ml",
        price: 0
      },
      {
        name: "all-purpose flour",
        quantity: 15,
        unit: "g",
        price: 2
      }
    ]
  },
  {
    id: 3,
    name: "Baked Brie with Peaches",
    type: "starter",
    image: "bakedbrie.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "round Brie cheese",
        quantity: 10,
        unit: "g",
        price: 8
      },
      {
        name: "raspberry preserves",
        quantity: 15,
        unit: "g",
        price: 10
      },
      {
        name: "peaches",
        quantity: 1,
        unit: "",
        price: 4
      }
    ]
  },
  {
    id: 100,
    name: "Meat balls",
    type: "main dish",
    image: "meatballs.jpg",
    description:
      "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
    ingredients: [
      {
        name: "extra lean ground beef",
        quantity: 115,
        unit: "g",
        price: 20
      },
      {
        name: "sea salt",
        quantity: 0.7,
        unit: "g",
        price: 3
      },
      {
        name: "small onion, diced",
        quantity: 0.25,
        unit: "",
        price: 2
      },
      {
        name: "garlic salt",
        quantity: 0.7,
        unit: "g",
        price: 2
      },
      {
        name: "Italian seasoning",
        quantity: 0.6,
        unit: "g",
        price: 3
      },
      {
        name: "dried oregano",
        quantity: 0.3,
        unit: "g",
        price: 3
      },
      {
        name: "crushed red pepper flakes",
        quantity: 0.6,
        unit: "g",
        price: 3
      },
      {
        name: "Worcestershire sauce",
        quantity: 6,
        unit: "ml",
        price: 7
      },
      {
        name: "milk",
        quantity: 20,
        unit: "ml",
        price: 4
      },
      {
        name: "grated Parmesan cheese",
        quantity: 5,
        unit: "g",
        price: 8
      },
      {
        name: "seasoned bread crumbs",
        quantity: 15,
        unit: "g",
        price: 4
      }
    ]
  },
  {
    id: 101,
    name: "MD 2",
    type: "main dish",
    image: "bakedbrie.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ingredient 1",
        quantity: 1,
        unit: "pieces",
        price: 8
      },
      {
        name: "ingredient 2",
        quantity: 15,
        unit: "g",
        price: 7
      },
      {
        name: "ingredient 3",
        quantity: 10,
        unit: "ml",
        price: 4
      }
    ]
  },
  {
    id: 102,
    name: "MD 3",
    type: "main dish",
    image: "meatballs.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ingredient 1",
        quantity: 2,
        unit: "pieces",
        price: 8
      },
      {
        name: "ingredient 2",
        quantity: 10,
        unit: "g",
        price: 7
      },
      {
        name: "ingredient 3",
        quantity: 5,
        unit: "ml",
        price: 4
      }
    ]
  },
  {
    id: 103,
    name: "MD 4",
    type: "main dish",
    image: "meatballs.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ingredient 1",
        quantity: 1,
        unit: "pieces",
        price: 4
      },
      {
        name: "ingredient 2",
        quantity: 12,
        unit: "g",
        price: 7
      },
      {
        name: "ingredient 3",
        quantity: 6,
        unit: "ml",
        price: 4
      }
    ]
  },
  {
    id: 200,
    name: "Chocolat Ice cream",
    type: "dessert",
    image: "icecream.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ice cream",
        quantity: 100,
        unit: "ml",
        price: 6
      }
    ]
  },
  {
    id: 201,
    name: "Vanilla Ice cream",
    type: "dessert",
    image: "icecream.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ice cream",
        quantity: 100,
        unit: "ml",
        price: 6
      }
    ]
  },
  {
    id: 202,
    name: "Strawberry",
    type: "dessert",
    image: "icecream.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ice cream",
        quantity: 100,
        unit: "ml",
        price: 6
      }
    ]
  }
];

// Deepfreeze
// https://github.com/substack/deep-freeze/blob/master/index.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (
      o.hasOwnProperty(prop) &&
      o[prop] !== null &&
      (typeof o[prop] === "object" || typeof o[prop] === "function") &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });
}

deepFreeze(dishesConst);
