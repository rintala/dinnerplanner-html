class DetailsView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render(dish) {
    console.log(dish);

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

    var content = `
        <div id='mobileMenu' >
          <p>My dinner: ${this.model.getNumberOfGuests()} people</p>
          <p>MENU</p>
        </div>
        <div id="dishSearchViewWrapper">
          <div id="dishSearchBody">
            <div id="dishItem">
            <div>
              <div id="dishDetailsWrapper">
                <div id="dishDetails">
                  <p id="dishDetailsTitle" class="value-main-course-name">${
                    dish.title
                  }</p>
                  <img id="dishDetailsImage" class="image border" src="${
                    dish.image
                  }"/>
                  <div id="dishDetailsBody"> ${dish.instructions}</div>
                  <button id="backButton" class="button">Go back and edit dinner</button>
                </div>
                <div id="dishIngredients">
                <div id="dishIngredientsTitle">Ingredients</div>
                ${ingredientsHTML}
                <hr> 
                <div style="padding-right: 20px; display: flex; justify-content: space-between">TOTAL <p>${
                  dish.pricePerServing
                } SEK </p> </div>
                  <hr>
                  <div>
                    <button id="addDishToMenuButton" class="button">Add dish to menu</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>`;
    this.container.innerHTML = content;
  }
  afterRender() {}
}
