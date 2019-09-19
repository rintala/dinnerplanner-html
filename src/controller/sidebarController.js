class SideBarController {
  constructor(view, model, generalStateController) {
    this.view = view;
    this.model = model;
    this.generalStateController = generalStateController;
    // TODO lab 3

    console.log("sidebar view");
    console.log("gsc", this.generalStateController);

    this._initializeListeners();
  }

  _initializeListeners() {
    console.log(
      "Controller is initialized..",
      this.view.container.querySelector("#confirmBtn")
    );

    /* const confirmButton = this.view.container.querySelector("#confirmBtn"); */
    console.log("this.view.confirmButton", this.view.confirmButton);
    this.view.confirmButton.addEventListener(
      "click",
      () => {
        console.log(this, "confirm button is clicked, lets show overview");
        return this.generalStateController.displayView("overview");
      },
      false
    );
    console.log("confirmbtn", this.view.confirmButton);
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
