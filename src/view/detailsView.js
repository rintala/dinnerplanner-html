class DetailsView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    var content = `

      <div id="dishSearchViewWrapper">
        <div id="sideBarView"></div>
        <div id="dishSearchBody">
          <div id="dishItem"></div>
        </div>
      </div>`;

    this.model
      .getDish(559251)
      .then(dish => {
        console.log('dish', dish);
        var ingredientsHTML = '';
        dish.extendedIngredients.forEach(ingredient => {
          const ingredientRow = `<div class="dishIngredient">
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
                </div>`;
          console.log('ingredientRow', ingredientRow);
          ingredientsHTML += ingredientRow;
        });

        document.getElementById('dishItem').innerHTML +=
          `
          <div>
            <div id="dishDetailsWrapper">
              <div id="dishDetails">
                <p id="dishDetailsTitle" class="value-main-course-name">${dish.title}</p>
                <img class="image border" src="${dish.image}"/>
                <div id="dishDetailsBody"> ${dish.instructions}</div>
                <a id="goBackBtn" class="button" onclick="location.href='../screens/searchScreen.html';">
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
      document.getElementById('sideBarView'),
      this.model
    );
    sideBarViewInstance.render();

    this.afterRender();
  }
  afterRender() {}
}
