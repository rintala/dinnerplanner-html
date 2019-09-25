class SideBarView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.confirmButton = null;
    this.inputNumberChanger = null;
  }

  render() {
    console.log('model in sideview', this.model);
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
    console.log('%cBUG searching', 'color: green; font-size: 2rem;');
    console.log('the model', this.model);
    console.log('getting menu', this.model.getFullMenu());
    // var m = this.model;
    // console.log('keys', Object.keys(m));
    // console.log(m + '');
    // console.log(m.menu + '');
    // console.log(m['menu']);
    // console.log([] + '');
    // console.log(m.menu.length);
    // console.log(m.menu[0]);
    const menuDishes = this.model.getFullMenu();
    console.log('still in sidebar', menuDishes);
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

    document.getElementById('sidebar').innerHTML = this.container.innerHTML;
    this.afterRender();
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
    console.log('sidebar updateView', details);
    console.log('model contains', this.model.getNumberOfGuests());
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
    if (this.container.querySelector('.' + details) !== null) {
      this.container.querySelector('.' + details).value = `${this.model.getNumberOfGuests()}`;
    }
  }
}
