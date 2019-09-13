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
    this.model.addDishToMenu(this.model.getDish(592479));
    this.model.addDishToMenu(this.model.getDish(547775));
    this.model.addDishToMenu(this.model.getDish(818941));

    var content = `
      <div>
        <div id='pageHeader'></div>
        <div id='pageBody'>
          <span id='dishItems'></span>  
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
