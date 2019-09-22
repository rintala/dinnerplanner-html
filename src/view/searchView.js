class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  getAllDishes() {
    displayLoader();
    this.container.querySelector("#dishItems").innerHTML = "";
    const query = this.container.querySelector("#searchKeyword").value;
    let dishType = this.container.querySelector("#dropDownMenu").value;

    if (dishType === "all") dishType = "";

    this.model
      .getAllDishes(dishType, query)
      .then(data => {
        let dishesHTML = data
          .map(
            dish =>
              `<div class="dish">
          <img class="dishImage image border" src="${this.model.getFullDishImageURL(
            dish.imageUrls
          )}"/>
          <p class="dishText text border value-main-course-name">${cutOverflowingText(
            dish.title,
            15
          )}</p>
        </div>`
          )
          .join("");
        this.container.querySelector("#dishItems").innerHTML = dishesHTML;
      })
      .catch(error => error)
      .finally(() => {
        hideLoader();
      });
  }

  render() {
    const dishTypes = [
      "all",
      "lunch",
      "main course",
      "morning meal",
      "brunch",
      "main dish",
      "breakfast",
      "dinner"
    ];

    // TODO: create a new view for the mobile menu
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
              <select id='dropDownMenu' class="dropDownMenu"></select>
              <button id='searchBtn' class="button" @onclick(this.searchButton())> search </button>
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

    let dishTypesHTML = dishTypes
      .map(dishName => `<option>${dishName}</option>`)
      .join("");

    this.container.querySelector("#dropDownMenu").innerHTML = dishTypesHTML;

    this.getAllDishes();

    // TODO: move this to controller
    document.getElementById("searchBtn").onclick = () => {
      this.getAllDishes();
    };

    this.afterRender();
  }
  afterRender() {}
}
