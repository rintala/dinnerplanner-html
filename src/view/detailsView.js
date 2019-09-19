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
    this.container.innerHTML = content;

    const dish = this.model.getCurrentDish();
    var ingredientsHTML = dish.extendedIngredients
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
                      XX SEK 
                    </div>
                  </div>`
      )
      .join("");

    this.container.querySelector("#dishItem").innerHTML =
      `
            <div>
              <div id="dishDetailsWrapper">
                <div id="dishDetails">
                  <p id="dishDetailsTitle" class="value-main-course-name">${dish.title}</p>
                  <img id="dishDetailsImage" class="image border" src="${dish.image}"/>
                  <div id="dishDetailsBody"> ${dish.instructions}</div>
                  <button class="button" onclick="location.href='../screens/searchScreen.html'">Go back and edit dinner</button>
                  back to search
                  </a>
                </div>
                <div id="dishIngredients">
                <div id="dishIngredientsTitle">Ingredients</div>` +
      ingredientsHTML +
      `             
                <hr> 
                <div style="padding-right: 20px; display: flex; justify-content: space-between">TOTAL <p>${dish.pricePerServing} SEK </p> </div>
                  <hr>
                  <div>
                    <button class="button">Add dish to menu</button>
                  </div>
                </div>
              </div>
            </div>
            `;

    let sideBarViewInstance = new SideBarView(
      this.container.querySelector("#sideBarView"),
      this.model
    );
    sideBarViewInstance.render();

    this.afterRender();
  }
  afterRender() {}
}
