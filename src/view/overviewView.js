class OverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  addingDishesToMenu = id => {
    return new Promise(resolve => {
      this.model.getDish(id).then(dish => {
        this.model.addDishToMenu(dish);
        resolve();
      });
    });
  };

  cutOverflowingText = text => {
    if (text.length > 20) {
      return text.substr(0, 20) + '...';
    }
    return text;
  };

  async render() {
    /* Adding some dishes to display - should be removed when adding UI is implemented */

    await this.addingDishesToMenu(818941);
    await this.addingDishesToMenu(547775);
    await this.addingDishesToMenu(592479);

    var content = `
      <div>
        <div id='pageHeader'>
          <p>My dinner: ${this.model.getNumberOfGuests()} people</p>
          <button class="button">Go back and edit dinner</button>
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
          <button class="button">Print full recipe</button>
        </div>
      </div>`;

    this.container.innerHTML = content;
    console.log('gettfullmenu', this.model.getFullMenu());
    this.model.getFullMenu().forEach(dish => {
      console.log('dish', dish);
      document.getElementById('dishItems').innerHTML += `
          <div class="dish">
            <img class="dishImage image border" src="${this.model.getDishImageURLFromString(
              dish.image
            )}"/>
            <p class="dishText value-main-course-name">${this.cutOverflowingText(dish.title)}</p>
            <p class="dishText">${dish.pricePerServing} SEK</p>
          </div>`;
    });

    const totalMenuPrice = this.model.getTotalMenuPrice();
    document.getElementsByClassName('value-total-price')[0].innerHTML = totalMenuPrice;

    this.afterRender();
  }

  afterRender() {}
}
