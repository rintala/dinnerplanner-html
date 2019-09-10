class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    var content = `
      <div id="dishSearchViewWrapper">
      <div id="loader" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div id="sideBarView"></div>
        <div>Add another one</div>
        <div id="dishSearchView">
          <input id="searchKeyword" type="text" placeholder="Enter keywords"></input>
          <a id="searchBtn" class="button">
            search
          </a>
        </div>
        <div id="dishItems">
            <span id="dishContainer">
            </span>
        </div>
      </div>`;
    this.model.getAllDishes().then(data => {
      data.forEach(dish => {
        this.model.getDish(dish.id).then(data => {
          document.getElementById('dishContainer').innerHTML += `
          <div class="dish">
            <img class="image border" src="${data.image}"/>
            <p class="text border">${data.title}</p>
          </div>`;
        });
      });
    });
    console.log('this containe', this.container);
    this.container.innerHTML = content;
    console.log('undefined?', this.model);
    let sideBarViewInstance = new SearchSideBarView(
      document.getElementById('sideBarView'),
      this.model
    );
    sideBarViewInstance.render();

    this.afterRender();
  }

  afterRender() {}
}
