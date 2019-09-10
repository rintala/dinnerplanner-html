class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    var content = `
      <div id="dishSearchViewWrapper">
      <div id="sideBarView"></div>
        <div>Add another one</div>
        <div id="dishSearchView">
          <input id="searchKeyword" type="text" placeholder="Enter keywords"></input>
          <a id="searchBtn" class="button">
            search
          </a>
        </div>
        <div id="dishItems">
          <div class="dishItem">1</div>
          <div class="dishItem">2</div>
          <div class="dishItem">3</div>
          <div class="dishItem">4</div>
        </div>
        
      </div>`;

    console.log("this containe", this.container);
    this.container.innerHTML = content;

    let sideBarViewInstance = new SearchSideBarView(
      document.getElementById("sideBarView")
    );
    sideBarViewInstance.render();

    this.afterRender();
  }

  afterRender() {}
}
