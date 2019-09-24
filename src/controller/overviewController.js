class OverviewController {
  constructor(view, model, generalStateController) {
    this.view = view;
    this.model = model;
    this.generalStateController = generalStateController;
    this.renderView = this.renderView.bind(this);
  }

  async renderView() {
    await this.view.render();
    // TODO lab 3

    this.view.goBackButton.addEventListener("click", () => {
      window.location = "#search";
      /* self.generalStateController.displayView("search");
      self.generalStateController.hideView("overview"); */
    });
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
