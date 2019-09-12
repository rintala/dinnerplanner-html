class SearchSideBarView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    var content = /* template */ `
        <div>
        <div>
        <p class="text-center p-max-width">
            My dinner
            People <span class="value-num-guests">${this.model.getNumberOfGuests()}</span>
        </p>
        </div>
        <div id="dishesInfo" style="display: flex; justify-content: space-between">
        </div>
        <div>SEK <span class="value-total-price"></span></div>
        <a id="confirmBtn" class="button" onClick="location.href='../screens/overviewScreen.html';">
          Confirm dinner
        </a>
      </div>
    `;
    this.container.innerHTML = content;

    const menuDishes = this.model.getFullMenu();
    console.log("full menu", menuDishes);
    menuDishes.forEach(menuDish => {
      document.getElementById("dishesInfo").innerHTML += `
      <div id="dishInfo" >
        Name: <span class="value-main-course-name">${menuDish.title}</span> 
        Price: <span>${menuDish.pricePerServing}</span>
      </div>`;
    });

    const totalMenuPrice = this.model.getTotalMenuPrice();
    document.getElementsByClassName(
      "value-total-price"
    )[0].innerHTML = totalMenuPrice;

    this.afterRender();
  }

  afterRender() {}
}
