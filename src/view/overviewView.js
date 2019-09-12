class OverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  cutOverflowingText = text => {
    if (text.length > 20) {
      return text.substr(0, 20) + '...';
    }
    return text;
  };

  render() {
    var content = `
      <div id='dishSearchViewWrapper'>
        <div id='sideBarView'></div>
        <div>
          <p id='dishTitle'></p>
          <img id='dishImg' class="dishOverViewImage"/> 
          <button class="button">Back to search</button>
        
        </div>
        <div class="ingredietsContainer">
          <div>
            <p>Ingrediends for x people</p>
          </div>
          <hr>
          <div id="dishIngredients"></div>
          <hr>
          <button class='button' id='addToMenuButton'>Add to menu</button>
          <p id="totalPrice"></p>
        </div>
        
      </div>
      `;
    this.container.innerHTML = content;

    this.model.getDish(442678).then(dish => {
      document.getElementById('dishTitle').innerHTML = dish.title;
      document.getElementById('dishImg').src = this.model.getFullDishImageURL(dish.imageUrls);
      dish.extendedIngredients.forEach(ingredient => {
        document.getElementById('dishIngredients').innerHTML += `
        <span>
          <p>${ingredient.name}</p>
          <p>${ingredient.measures.metric.amount}</p>
          <p>${ingredient.measures.metric.unitShort}</p>
        </span>
        `;
        document.getElementById('totalPrice').innerHTML = dish.pricePerServing; //This is not working
        document.getElementById('addToMenuButton').onclick = () => {
          console.log('adding dish to menu');
          this.model.addDishToMenu(dish);
          console.log('dish in menu: ', this.model.getFullMenu());
        };
      });
    });

    let sideBarViewInstance = new SearchSideBarView(
      document.getElementById('sideBarView'),
      this.model
    );
    sideBarViewInstance.render();

    this.afterRender();
  }
  afterRender() {}
}
