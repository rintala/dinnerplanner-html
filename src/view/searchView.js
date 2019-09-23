class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  async render() {
    console.log('rendering search view');
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

    // TODO: create a new view for the mobile menu
    let dishTypesHTML = dishTypes.map(dishName => `<option>${dishName}</option>`).join('');

    var content = `
      <div id='mobileMenu' >
       My dinner: <span class="value-num-guests">${this.model.getNumberOfGuests()}</span> people
        <p>MENU</p>
      </div>
      <div id='dishSearchViewWrapper'>
        <div id='sideBarView'></div>
        <div id='dishSearchBody'>
          <div id='dishSearchHeader'>
            <div><p class="title">Find a dish</p></div>
            <div id='dishSearchView'>
              <input id='searchKeyword' class="border" type='text' placeholder='Enter keywords'></input>
              <select id='dropDownMenu' class="dropDownMenu">${dishTypesHTML}</select>
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
    document.getElementById('app').innerHTML = content;
  }

  addSearchResults(data) {
    const dishesHTML = data
      .map(dish => {
        return `
        <div id="${dish.id}" class="dish">
          <img class="dishImage image border" src="${dish.imageUrl}"/>
          <p class="dishText text border">${cutOverflowingText(dish.title, 15)}</p>
        </div>`;
      })
      .join('');

    document.querySelector('#dishItems').innerHTML = dishesHTML;
  }
  afterRender() {}
}
