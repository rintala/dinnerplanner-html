class SearchSideBarView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }
  /* <input style="width: 30px; padding-left: 20px" type="number" value="${this.model.getNumberOfGuests()}"></input> */
  render() {
    var content = /* template */ `
        <div>
        <div>
              <div id="sideBarTitle">My dinner</div>
              <div id="peopleCounter">
                People 
                <span class="value-num-guests">${this.model.getNumberOfGuests()}</span>
             
              </div>
        </div>
        <div id="dishesInfoTitle">
          <span>Dish name</span>
          <span>Cost</span>
        </div>
        <div id="dishesInfo"></div>
        
        <div id="totalPrice">SEK <span class="value-total-price"></span></div>
        <a id="confirmBtn" class="button" onClick="location.href='../screens/overviewScreen.html';">
          Confirm dinner
        </a>
      </div>
    `;
    this.container.innerHTML = content;

    const menuDishes = this.model.getFullMenu();
    console.log('full menu', menuDishes);
    menuDishes.forEach(menuDish => {
      document.getElementById('dishesInfo').innerHTML += `
      <div class="dishInfo" >
       <span class="value-main-course-name">${menuDish.title}</span> 
       <span>${menuDish.pricePerServing}</span>
      </div>`;
    });

    const totalMenuPrice = this.model.getTotalMenuPrice();
    document.getElementsByClassName('value-total-price')[0].innerHTML = totalMenuPrice;

    this.afterRender();
  }

  afterRender() {}
}
