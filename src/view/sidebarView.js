class SideBarView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.confirmButton = null;
  }

  render() {
    var content = /* template */ `
        <div>
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
          <span>${menuDish.pricePerServing}</span>
      </div>`
      )
      .join("");

    this.container.querySelector("#dishesInfo").innerHTML = dishInfoHTML;

    const totalMenuPrice = this.model.getTotalMenuPrice();
    this.container.getElementsByClassName(
      "value-total-price"
    )[0].innerHTML = totalMenuPrice;

    this.afterRender();
  }

  afterRender() {
    this.confirmButton = this.container.querySelector("#confirmBtn");

    /* this.confirmButton.addEventListener(
      "click",
      () => {
        console.log(this, "confirm button is clicked, lets show overview");
      },
      false
    ); */
  }
}
