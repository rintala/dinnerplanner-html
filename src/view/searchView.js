class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    return new Promise((resolve, reject) => {
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
            this.model.getDish(dish.id).then(data => {
              document.getElementById("dishItems").innerHTML += `
          <div class="dish">
            <img class="image border" src="${data.image}"/>
            <p class="text border value-main-course-name">${data.title}</p>
          </div>`;
            });
          });
        })
        .then(() => {
          this.container.innerHTML = content;
          let sideBarViewInstance = new SearchSideBarView(
            document.getElementById("sideBarView"),
            this.model
          );
          sideBarViewInstance.render();

          this.afterRender();
        })
        .then(() => console.log("resolvedd", document, "<= doc"))
        .then(() => resolve())
        .catch(error => {
          console.log("errorrr", error);
          return reject(error);
        });
    });
  }
  afterRender() {}
}
