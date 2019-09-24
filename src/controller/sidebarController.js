class SideBarController {
  constructor(view, model, generalStateController) {
    this.view = view;
    this.model = model;
    this.generalStateController = generalStateController;
    this.renderView = this.renderView.bind(this);
  }

  hideView() {
    this.view.container.innerHTML = "";
  }

  renderView() {
    this.view.render();
    this.view.confirmButton.addEventListener("click", () => {
      window.location = "#overview";
    });
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
