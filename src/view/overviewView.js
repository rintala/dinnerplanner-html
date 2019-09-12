class OverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    var content = `
      <div id="loader" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      <div id="dishSearchViewWrapper">
        
        <div id="dishSearchBody">
          <div id="dishSearchHeader">
            <p class="text-center p-max-width" style="font-size: 30px">
              My dinner:
              <span class="value-num-guests">${this.model.getNumberOfGuests()}</span> people
            </p>
            <div>SEK <span class="value-total-price"></span></div>
            <a id="goBackBtn" class="button" onclick="location.href='../screens/searchScreen.html';">
              Go back and edit dinner
            </a>
          </div>
          <div id="dishItems"></div>
          <a id="toPrintBtn" class="button" onclick="location.href='../screens/printoutScreen.html';">
              Print Full Recipe
          </a>
          
        </div>
      </div>`;
    this.container.innerHTML = content;
    console.log("gettfullmenu", this.model.getFullMenu());
    this.model.getFullMenu().forEach(dish => {
      document.getElementById("dishItems").innerHTML += `
          <div class="dish">
            <img class="dishImage image border" src="${this.model.getDishImageURLFromString(
              dish.image
            )}"/>
            <p class="dishText value-main-course-name">${dish.title}</p>
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
