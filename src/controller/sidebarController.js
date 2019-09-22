class SideBarController {
  constructor(view, model, generalStateController) {
    this.view = view;
    this.model = model;
    this.generalStateController = generalStateController;
    // TODO lab 3

    console.log("sidebar view");
    console.log("gsc", this.generalStateController);
    const self = this;
    console.log("self", self);
    this._initializeListeners(self);
  }

  async _initializeListeners(self) {
    console.log("SELF", self);
    await this.view.render();

    /* const confirmButton = this.view.container.querySelector("#confirmBtn"); */
    console.log("this.view.confirmButton", this.view.confirmButton);
    this.view.confirmButton.addEventListener(
      "click",
      () => {
        self.generalStateController.displayView("overview");
        self.generalStateController.hideView("details");
      },
      false
    );
    console.log("this.view after", this.view);
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
