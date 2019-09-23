class SideBarView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.confirmButton = null;
    this.inputNumberChanger = null;
  }

  render() {
    var content = /* template */ `
        <div id="sideBarViewContainer">
        <div>
          <div id="sideBarTitle">My dinner</div>
          <div style="background-color: #ababac">
            <div style="padding-left: 10px; padding-top: 5px">People</div> 
            <div id="peopleCounter">
              <input class="input-num-guests" type="number" value="${this.model.getNumberOfGuests()}">
              </input>
            </div>
          </div>
        </div>
        <div id="dishesInfoTitle">
          <span>Dish name</span>
          <span>Cost</span>
        </div>
        <div id="dishesInfo"></div>
        
        <div id="totalPrice">SEK <span class="value-total-price"></span></div>
        <a id="confirmBtn" class="button">
          Confirm dinner
        </a>
      </div>
    `;
    this.container.innerHTML = content;

    const menuDishes = this.model.getFullMenu();

    let dishInfoHTML = menuDishes
      .map(
        menuDish => `
       
      <div class="dishInfo" >
          <span class="value-main-course-name">${menuDish.title}</span> 
          <span>${this.model.getDishPriceForNumberOfPeople(menuDish)}</span>
      </div>`
      )
      .join('');

    this.container.querySelector('#dishesInfo').innerHTML = dishInfoHTML;

    const totalMenuPrice = this.model.getTotalMenuPriceForNumberOfPeople();
    this.container.getElementsByClassName('value-total-price')[0].innerHTML = totalMenuPrice;

    this.afterRender();
    document.getElementById('sidebar').innerHTML = this.container.innerHTML;
  }

  afterRender() {
    this.confirmButton = this.container.querySelector('#confirmBtn');
    this.inputNumberChanger = this.container.querySelector('.input-num-guests');

    this.model.addObserver(this);
    /* this.confirmButton.addEventListener(
      "click",
      () => {
      //  console.log(this, "confirm button is clicked, lets show overview");
      },
      false
    ); */
  }

  updateView(details) {
    //  console.log("ydopatecidwe", details);
    if (this.container.querySelector('#' + details) !== null) {
      this.container.querySelector('#' + details).innerHTML = '';
      const menuDishes = this.model.getFullMenu();

      let dishInfoHTML = menuDishes
        .map(
          menuDish => `
         
        <div class="dishInfo" >
            <span class="value-main-course-name">${menuDish.title}</span> 
            <span>${this.model.getDishPriceForNumberOfPeople(menuDish)}</span>
        </div>`
        )
        .join('');

      this.container.querySelector('#dishesInfo').innerHTML = dishInfoHTML;

      const totalMenuPrice = this.model.getTotalMenuPriceForNumberOfPeople();
      this.container.getElementsByClassName('value-total-price')[0].innerHTML = totalMenuPrice;
    }
  }
}
