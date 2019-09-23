class OverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.goBackButton = null;
  }

  addingDishesToMenu = id => {
    return new Promise(resolve => {
      this.model.getDish(id).then(dish => {
        this.model.addDishToMenu(dish);
        resolve();
      });
    });
  };

  render() {
    /* Adding some dishes to display - should be removed when adding UI is implemented */
    var content = `
      <div>
        <div id='pageHeader'>
          <p id="numberOfGuests">My dinner: <span class="value-num-guests">${this.model.getNumberOfGuests()}</span> people</p>
          <button class="button" id="goBackBtn">Go back and edit dinner</button>
        </div>
        <hr>
        <div id='pageBody'>
          <div id='dishItems'></div>  
          <div id='priceDiv'></div>
          <div>
            <p>Total Cost</p>
            <p class="value-total-price"></p>
          </div>
          <hr> 
          <button id="toPrintBtn" class="button" onclick="location.href='../screens/printoutScreen.html';">Print full recipe</button>
        </div>
      </div>`;

    this.container.innerHTML = content;

    let dishItemsHTML = this.model
      .getFullMenu()
      .map(dish => {
        this.model.getDishPriceForNumberOfPeople(dish);
        return `
          <div class="dish">
            <img class="dishImage border" src="${this.model.getDishImageURLFromString(
              dish.image
            )}"/>
            <p class="dishText value-main-course-name">${cutOverflowingText(
              dish.title,
              20
            )}</p>
            <p class="dishText">${this.model.getDishPriceForNumberOfPeople(
              dish
            )} SEK</p>
          </div>`;
      })
      .join("");

    this.container.querySelector("#dishItems").innerHTML = dishItemsHTML;

    const totalMenuPrice = this.model.getTotalMenuPrice();
    this.container.getElementsByClassName(
      "value-total-price"
    )[0].innerHTML = totalMenuPrice;

    this.afterRender();
  }

  updateView(details) {
    if (this.container.querySelector("." + details) !== null) {
      this.container.querySelector("." + details).innerHTML = "";
      this.container.querySelector(
        "." + details
      ).innerHTML = `${this.model.getNumberOfGuests()}`;
    }

    if (this.container.querySelector("#" + details)) {
      let dishItemsHTML = this.model
        .getFullMenu()
        .map(dish => {
          this.model.getDishPriceForNumberOfPeople(dish);
          return `
          <div class="dish">
            <img class="dishImage border" src="${this.model.getDishImageURLFromString(
              dish.image
            )}"/>
            <p class="dishText value-main-course-name">${cutOverflowingText(
              dish.title,
              20
            )}</p>
            <p class="dishText">${this.model.getDishPriceForNumberOfPeople(
              dish
            )} SEK</p>
          </div>`;
        })
        .join("");

      this.container.querySelector("#dishItems").innerHTML = dishItemsHTML;
    }

    if (this.container.querySelector("." + details)) {
      const totalMenuPrice = this.model.getTotalMenuPriceForNumberOfPeople();
      this.container.getElementsByClassName(
        "value-total-price"
      )[0].innerHTML = totalMenuPrice;
    }
  }

  afterRender() {
    this.goBackButton = this.container.querySelector("#goBackBtn");
    this.model.addObserver(this);
  }
}
