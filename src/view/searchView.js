class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    const dish1 = this.model.getDish(1);
    console.log("dish1", dish1);
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
          <div class="dishItem">
            <span class="value-main-course-name">1</span>
          </div>
          <div class="dishItem">2</div>
          <div class="dishItem">3</div>
          <div class="dishItem">4</div>
        </div>
        
      </div>`;

    console.log("this containe", this.container);
    this.container.innerHTML = content;
    console.log("undefined?", this.model);
    let sideBarViewInstance = new SearchSideBarView(
      document.getElementById("sideBarView"),
      this.model
    );
    sideBarViewInstance.render();

    this.afterRender();
  }

  afterRender() {}
}
