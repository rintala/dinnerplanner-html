class OverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    console.log("MODEL", this.model);

    var content = `
      <div id="loader" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      <div id="dishSearchViewWrapper">
        
        <div id="dishSearchBody">
          <div id="dishSearchHeader">
            <p class="text-center p-max-width" style="font-size: 30px">
              My dinner:
              <span class="value-num-guests">${this.model.numberOfGuests}</span> people
            </p>
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
    this.model
      .getAllDishes()
      .then(data => {
        data.forEach(dish => {
          this.model.getDish(dish.id).then(data => {
            document.getElementById("dishItems").innerHTML += `
          <div class="dish">
            <img class="image border" src="${data.image}"/>
            <p class="text border value-main-course-name">${data.title}</p>
          </div>`;
          });
        });
      })
      .then(() => {
        this.container.innerHTML = content;

        this.afterRender();
      })
      .then(() => console.log("resolvedd", document, "<= doc"))
      .then(() => resolve())
      .catch(error => {});

    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {}
}
