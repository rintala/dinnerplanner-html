//DinnerModel class
class DinnerModel {
  constructor() {
    this.GROUP_ID = 16;
    this.API_KEY = config.SECRET_API_KEY;
    this.baseURLRecipes =
      'http://sunset.nada.kth.se:8080/iprog/group/' + this.GROUP_ID + '/recipes/';
    this.spoonacularImagesURL = 'https://spoonacular.com/recipeImages/';
    //TODO Lab 0
    // implement the data structure that will hold number of guests
    // and selected dishes for the dinner menu
    this.guests = 0;
    this.menu = [];
    this.currentDish = undefined;
    this._observers = [];
  }

  _handleHTTPError(response) {
    if (response.ok) return response;
    throw Error(response.statusText);
  }

  _handleHTTPErrorGetDish(response) {
    if (response.ok) {
      return response.json().then(object => object);
    } else {
      return { code: response.status };
    }
  }

  setNumberOfGuests(num) {
    if (num > 0) this.guests = num;
    this.updateObservers('input-num-guests');
    this.updateObservers('value-num-guests');
    this.changeCookie({ attribute: 'guests', value: num });
    document.cookie = `guests=${num};`;
  }

  getNumberOfGuests() {
    return this.guests;
  }

  getSelectedDish(type) {
    return new Promise((resolve, reject) => {
      if (!type) {
        resolve(this.getFullMenu());
      }
      //returns undefined if nothing is found
      resolve(
        this.menu.map(dish => {
          if (Object.values(dish.dishTypes).indexOf(type) > -1) {
            return dish;
          }
        })
      );
    });
  }

  getCurrentDish() {
    return this.currentDish;
  }

  setCurrentDish(dish) {
    this.currentDish = dish;
  }

  getDishPriceForNumberOfPeople(menuDish) {
    return Math.round(menuDish.pricePerServing * this.getNumberOfGuests());
  }

  getFullMenu() {
    return this.menu;
  }

  getAllIngredients() {
    return Array.from(
      new Set(
        this.getFullMenu()
          //using set to filter duplicates
          .map(dish => dish.extendedIngredients)
          .flat()
      )
    );
  }

  getTotalMenuPrice() {
    if (this.menu.length === 0) {
      return 0;
    }
    return this.menu
      .map(dish => {
        return dish.pricePerServing;
      })
      .reduce((sum, add) => sum + add)
      .toFixed(2); //Rounding to 2 decimals
  }

  getTotalMenuPriceForNumberOfPeople() {
    if (this.menu.length === 0) {
      return 0;
    }
    return this.menu
      .map(dish => {
        return Math.round(dish.pricePerServing * this.getNumberOfGuests());
      })
      .reduce((sum, add) => sum + add)
      .toFixed(2); //Rounding to 2 decimals
  }

  addDishToMenu(dishToAdd) {
    //  console.log("adding dish to meni");
    if (!this.menu.length) {
      this.menu.push(dishToAdd);
    } else {
      this.menu = Array.from(
        new Set([...this.menu.filter(dish => dish.id !== dishToAdd.id), dishToAdd])
      );
    }
    document.cookie = 'dishes=' + this.getFullMenu().map(dish => dish.id);
    this.updateObservers('dishItems');
  }

  removeDishFromMenu(id) {
    this.menu = this.menu.filter(dish => dish.id !== id);
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {
    //TODO:

    let url;
    if (!type && !query) {
      url = `http://sunset.nada.kth.se:8080/iprog/group/13/recipes/search?`;
    } else {
      url = `http://sunset.nada.kth.se:8080/iprog/group/13/recipes/search?query=${query}&dishTypes=${type}`;
    }
    return fetch(url, {
      method: 'GET',
      headers: {
        'X-Mashape-Key': config.SECRET_API_KEY
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return { code: res.status };
        }
      })
      .then(data => data.results)
      .catch(err => err);
  }

  //Returns a dish of specific ID
  getDish(id) {
    let url = `http://sunset.nada.kth.se:8080/iprog/group/13/recipes/${id}/information`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'X-Mashape-Key': config.SECRET_API_KEY
      }
    })
      .then(this._handleHTTPErrorGetDish)
      .catch(console.error);
  }

  getFullDishImageURL(imageNameArray) {
    if (imageNameArray && imageNameArray.length) {
      return this.spoonacularImagesURL + imageNameArray[0];
    }
    return this.spoonacularImagesURL + 'matcha-green-tea-and-pineapple-smoothie-801710.jpg';
  }
  getDishImageURLFromString(imageNameString) {
    if (imageNameString) {
      return imageNameString;
    }
    return this.spoonacularImagesURL + 'matcha-green-tea-and-pineapple-smoothie-801710.jpg';
  }

  // observer functions
  addObserver(observer) {
    this._observers.push(observer);
  }

  // implemenent remove function for observers as well

  updateObservers(detailsToUpdateWith) {
    // instead define update function in each observer that doesnt re-render entire view
    this._observers.forEach(obs => obs.updateView(detailsToUpdateWith));
  }

  changeCookie(data) {
    document.cookie = data.attribute + '=' + data.value + ';';
  }
}
