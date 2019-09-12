class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  cutOverflowingText = text => {
    if (text.length > 15) {
      return text.substr(0, 15) + '...';
    }
    return text;
  };

  render() {
    const dishTypes = [
      'all',
      'lunch',
      'main course',
      'morning meal',
      'brunch',
      'main dish',
      'breakfast',
      'dinner'
    ];
    var content = `
      <div id='dishSearchViewWrapper'>
        <div id='sideBarView'></div>
        <div id='dishSearchBody'>
          <div id='dishSearchHeader'>
            <div><p class="title">Find a dish</p></div>
            
            <div id='dishSearchView'>
              <input id='searchKeyword' class="border" type='text' placeholder='Enter keywords'></input>
              <select id='dropDownMenu' class="dropDownMenu"></select>
              <button id='searchBtn' class="button"> search </button>
              <div id='loader' class='spinner-border' role='status'>
                <span class='sr-only'>Loading...</span>
              </div>      
            </div>
          </div>

          <div id='dishItems'></div>
        </div>
      </div>
      `;
    this.container.innerHTML = content;

    dishTypes.forEach(dishName => {
      document.getElementById('dropDownMenu').innerHTML += `<option>${dishName}</option>`;
    });

    this.model
      .getAllDishes()
      .then(data => {
        data.forEach(dish => {
          document.getElementById('dishItems').innerHTML += `
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

    let sideBarViewInstance = new SearchSideBarView(
      document.getElementById('sideBarView'),
      this.model
    );
    sideBarViewInstance.render();

    this.afterRender();
  }
  afterRender() {}
}
