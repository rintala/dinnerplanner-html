class PrintoutView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.goBackButton = null;
  }

  render() {
    var content = `
      <div>
        <div id='pageHeader'>
          <p>My dinner: ${this.model.getNumberOfGuests()} people</p>
          <button id="goBackBtn" class="button">Go back and edit dinner</button>
        </div>
        <hr>
        <div id='pageBody'>
          <div class="dishesToPrint">
            <div id='dishItems'></div>
            <div> 
            <b>Preparations</b> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</div>
          </div>  
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
    let dishesToPrintHTML = this.model
      .getFullMenu()
      .map(
        dish => `
        <div class="dishToPrint">
            <img class="dishImage border" src="${this.model.getDishImageURLFromString(
              dish.image
            )}"/>
            <div class="dishToPrintText>
              <p class="value-main-course-name" style="font-size: 20px">${cutOverflowingText(
                dish.title,
                20
              )}</p>
              <p class="dishText">${dish.pricePerServing} </p>
            </div>
       </div>
         `
      )
      .join("");

    this.container.querySelector("#dishItems").innerHTML = dishesToPrintHTML;

    const totalMenuPrice = this.model.getTotalMenuPrice();
    this.container.getElementsByClassName(
      "value-total-price"
    )[0].innerHTML = totalMenuPrice;

    this.afterRender();
  }

  afterRender() {
    this.goBackButton = this.container.querySelector("#goBackBtn");
  }
}
