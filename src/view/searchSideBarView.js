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
            People <span class="value-num-guests">${this.model.numberOfGuests}</span>
        </p>
        </div>
        <div style="display: flex; justify-content: space-between">
            <span>Dish name</span>
            <span>Cost</span>
        </div>
        <div> TOTAL COST </div>
        <a id="confirmBtn" class="button" onClick="location.href='../screens/overviewScreen.html';">
          Confirm dinner
        </a>
      </div>
    `;
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {}
}
