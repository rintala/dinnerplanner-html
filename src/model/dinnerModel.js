//DinnerModel class
class DinnerModel {
  constructor() {
    this.guests = 0;
    this.menu = [];
  }

  setNumberOfGuests(num) {
    if (num > 0) this.guests = num;
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
    return this.menu
      .map(dish => {
        return dish.pricePerServing;
      })
      .reduce((sum, add) => sum + add);
  }

  addDishToMenu(dishToAdd) {
    if (!this.menu.length) {
      this.menu.push(dishToAdd);
    } else {
      this.menu = Array.from(
        new Set([...this.menu.filter(dish => dish.id !== dishToAdd.id), dishToAdd])
      );
    }
  }

  removeDishFromMenu(id) {
    this.menu = this.menu.filter(dish => dish.id !== id);
  }

  displayLoader() {
    if (document.getElementById('loader').style.display === 'none') {
      document.getElementById('loader').style.display = 'inline';
    } else {
      document.getElementById('loader').style.display = 'none';
    }
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {
    //TODO:
    this.displayLoader();
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
      .catch(err => err)
      .finally(() => this.displayLoader());
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
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return { code: res.status };
        }
      })
      .then(data => {
        this.displayLoader();
        return data;
      })
      .catch(err => {
        return err;
      });
  }
}
