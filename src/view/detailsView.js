class DetailsView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    var content = `
      <div id='mobileMenu' >
        <p>My dinner: ${this.model.getNumberOfGuests()} people</p>
        <p>MENU</p>
      </div>
      <div id="dishSearchViewWrapper">
        <div id="sideBarView"></div>
        <div id="dishSearchBody">
          <div id="dishItem">
          </div>
        </div>
      </div>`;

    const dishToDisplay = this.model.getCurrentDish();
    var ingredientsHTML = dishToDisplay.extendedIngredients
      .map(
        ingredient => `<div class="dishIngredient">
                  <div class="dishIngredientMeasure">
                    ${ingredient.measures.metric.amount}
                    ${ingredient.measures.metric.unitShort}
                  </div>
                  <div class="dishIngredientTitle">
                    ${ingredient.name}
                  </div>
                  <div class="dishIngredientPrice">
                    X SEK 
                  </div>
                </div>`
      )
      .join("");

    this.container.innerHTML = content;

    document.getElementById("dishItem").innerHTML =
      `
          <div>
            <div id="dishDetailsWrapper">
              <div id="dishDetails">
                <p id="dishDetailsTitle" class="value-main-course-name">${dishToDisplay.title}</p>
                <img id="dishDetailsImage" class="image border" src="${dishToDisplay.image}"/>
                <div id="dishDetailsBody"> ${dishToDisplay.instructions}</div>
                <button class="button" onclick="location.href='../screens/searchScreen.html'">Go back and edit dinner</button>
                </a>
              </div>
              <div id="dishIngredients">
              <div id="dishIngredientsTitle">Ingredients</div>` +
      ingredientsHTML +
      ` 
                <hr>
                <p>Total: ${dishToDisplay.pricePerServing} SEK</p>  
                <hr>
                <div>
                  <button class="button">Add dish to menu</button>
                </div>
              </div>
            </div>
          </div>
          `;

    let sideBarViewInstance = new SearchSideBarView(
      document.getElementById("sideBarView"),
      this.model
    );
    sideBarViewInstance.render();

    this.afterRender();
  }
  afterRender() {}
}
