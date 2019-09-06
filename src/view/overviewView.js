class OverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    var content = /* template */ `
          <div>
          <div id="overviewHeader">
            <p class="text-center p-max-width">
                My Dinner:
                <span class="value-num-guests">3</span> people
            </p>
            <a id="goBackBtn" class="button" onClick="location.href='../screens/searchScreen.html';">
              Go back and edit dinner
            </a>
          </div>
          <div id="dishItems">
            <div class="dishItem">1</div>
            <div class="dishItem">2</div>
            <div class="dishItem">3</div>
            <div class="dishItem">4</div>
          </div>
          <a id="printBtn" class="button">
            Print Full Recipe
          </a>
        </div>
      `;
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {}
}
