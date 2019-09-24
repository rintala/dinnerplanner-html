class SearchController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.getAllDishes = this.getAllDishes.bind(this);
    // TODO lab 3
  }

  async renderView() {
    console.log('rendering !.');
    this.view.render();
    //loading content
    await this.getAllDishes();
    this.addListeners();
  }

  testFunction() {
    console.log('TEST IS WORKING');
  }

  addListeners() {
    console.log('Adding event listner');
    this.view.container.querySelector('#searchBtn').addEventListener('click', this.getAllDishes);

    this.view.container.querySelector('#dishItems').addEventListener('click', dish => {
      window.location = `#details?id=${dish.target.parentElement.id}`;
    });
  }

  update(payload) {
    // TODO Lab 3
  }

  getAllDishes() {
    /* Makes an API call for dishes matching the search queries, then pushes the result to the view */
    return new Promise(resolve => {
      displayLoader();
      document.querySelector('#dishItems').innerHTML = '';
      const query = document.querySelector('#searchKeyword').value;
      let dishType = document.querySelector('#dropDownMenu').value;

      if (dishType === 'all') dishType = '';

      //Why does this return a promise?
      const dishData = this.model
        .getAllDishes(dishType, query)
        .then(data =>
          data.map(dish => {
            return {
              imageUrl: this.model.getFullDishImageURL(dish.imageUrls),
              title: dish.title,
              id: dish.id
            };
          })
        )
        .catch(error => error)
        .finally(() => {
          hideLoader();
          dishData.then(data => this.view.addSearchResults(data));
          resolve();
        });
    });
  }
}
