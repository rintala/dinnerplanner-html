class SideBarController {
  constructor(view, model, generalStateController) {
    console.log("Sidebar is being created");
    this.view = view;
    this.model = model;
    this.generalStateController = generalStateController;

    this.renderView = this.renderView.bind(this);
    // TODO lab 3

    //  console.log("sidebar view");
    //  console.log("gsc", this.generalStateController);
    const self = this;
    //  console.log("self", self);
    /* this.renderView(self); */
  }

  hideView() {
    this.view.container.innerHTML = "";
  }

  async renderView() {
    console.log("SELF", document);
    await this.view.render();
    console.log("thisc onfirm", this.view.confirmButton);
    console.log("this model", this.model);
    /* const confirmButton = this.view.container.querySelector("#confirmBtn"); */
    //  console.log("this.view.confirmButton", this.view.confirmButton);
    this.view.confirmButton.addEventListener("click", () => {
      console.log("click to confirm");
      window.location = "#overview";
      /*  this.generalStateController.hideAllViews();
      this.generalStateController.displayView("overview"); */
    });
    //  console.log("inputnubmerchanger", this.view.inputNumberChanger);
    this.view.inputNumberChanger.addEventListener("input", e => {
      if (!isNaN(parseInt(e.data))) {
        this.model.setNumberOfGuests(parseInt(e.data));
        this.model.updateObservers("dishesInfo");
        this.model.updateObservers("value-num-guests");
        this.model.updateObservers("dishItems");
        this.model.updateObservers("value-total-price");
      }
      //  console.log("this.view after", this.view, this.model);
    });
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
