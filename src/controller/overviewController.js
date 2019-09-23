class OverviewController {
  constructor(view, model, generalStateController) {
    this.view = view;
    this.model = model;
    this.generalStateController = generalStateController;
    const self = this;
    // TODO lab 3
    this.renderView(self);
  }

  async renderView(self) {
    await this.view.render();
    // TODO lab 3

    this.view.goBackButton.addEventListener("click", () => {
      self.generalStateController.displayView("sideBar");
      self.generalStateController.displayView("search");
      self.generalStateController.hideView("overview");
    });
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
