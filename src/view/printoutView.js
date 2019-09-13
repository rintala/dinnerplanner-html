class PrintoutView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    var content = `
      <div id="dishSearchViewWrapper">
        <div id="dishSearchBody">
          <div id="dishSearchHeader">
            <p class="text-center p-max-width" style="font-size: 30px">
              My dinner:
              <span class="value-num-guests">${this.model.getNumberOfGuests()}</span> people
            </p>
            <a id="goBackBtn" class="button" onclick="location.href='../screens/searchScreen.html';">
              Go back and edit dinner
            </a>
          </div>
          <div id="dishItems"></div>
      
        </div>
      </div>`;
    this.model.getAllDishes().then(data => {
      data.forEach(dish => {
        this.model.getDish(dish.id).then(data => {
          document.getElementById('dishItems').innerHTML += `
          <div class="dish">
            <img class="dishImage image border" src="${data.image}"/>
            <p class="dishText text border value-main-course-name">${cutOverflowingText(
              data.title
            )}</p>
          </div>`;
        });
      });
    });

    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {}
}
