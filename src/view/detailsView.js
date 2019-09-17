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

    this.model
      .getDish(559251)
      .then(dish => {
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
                    SEK 
                  </div>
                </div>`
          )
          .join("");

        document.getElementById("dishItem").innerHTML =
          `
          <div>
            <div id="dishDetailsWrapper">
              <div id="dishDetails">
                <p id="dishDetailsTitle" class="value-main-course-name">${dish.title}</p>
                <img class="image border" src="${dish.image}"/>
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
                <div>
                  <button class="button">Add dish to menu</button>
                  <p>${dish.pricePerServing}</p>  
                </div>
              </div>
            </div>
          </div>
          `;
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
