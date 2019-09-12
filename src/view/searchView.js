class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  cutOverflowingText = text => {
    if (text.length > 20) {
      return text.substr(0, 20) + "...";
    }
    return text;
  };

  render() {
    var content = `
      <div id="loader" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      <div id="dishSearchViewWrapper">
        <div id="sideBarView"></div>
        <div id="dishSearchBody">
          <div id="dishSearchHeader">
            <div>Add another one</div>
            <div id="dishSearchView">
              <input id="searchKeyword" type="text" placeholder="Enter keywords"></input>
              <a id="searchBtn" class="button">
                search
              </a>
            </div>
          </div>
          
          <div id="dishItems"></div>
        </div>
      </div>`;
    this.model
      .getAllDishes()
      .then(data => {
        data.forEach(dish => {
          document.getElementById("dishItems").innerHTML += `
          <div class="dish">
            <img class="dishImage image border" src="${this.model.getFullDishImageURL(
              dish.imageUrls
            )}"/>
            <p class="dishText text border value-main-course-name">${this.cutOverflowingText(
              dish.title
            )}</p>
          </div>`;
        });
      })
      .catch(error => error);

    this.container.innerHTML = content;
    let sideBarViewInstance = new SearchSideBarView(
      document.getElementById("sideBarView"),
      this.model
    );
    sideBarViewInstance.render();

    this.afterRender();
  }
  afterRender() {}
}
