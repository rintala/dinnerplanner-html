class SideBarController {
  constructor(view, model, generalStateController) {
    console.log('Sidebar is being created');
    this.view = view;
    this.model = model;
    this.generalStateController = generalStateController;
    // TODO lab 3

    //  console.log("sidebar view");
    //  console.log("gsc", this.generalStateController);
    const self = this;
    //  console.log("self", self);
    this.renderView(self);
  }

  async renderView(self) {
    //  console.log("SELF", self);
    await this.view.render();

    /* const confirmButton = this.view.container.querySelector("#confirmBtn"); */
    //  console.log("this.view.confirmButton", this.view.confirmButton);
    this.view.confirmButton.addEventListener(
      'click',
      () => {
        self.generalStateController.hideAllViews();
        self.generalStateController.displayView('overview');
      },
      false
    );
    //  console.log("inputnubmerchanger", this.view.inputNumberChanger);
    this.view.inputNumberChanger.addEventListener('input', e => {
      if (!isNaN(parseInt(e.data))) {
        this.model.setNumberOfGuests(parseInt(e.data));
        this.model.updateObservers('dishesInfo');
        this.model.updateObservers('value-num-guests');
        this.model.updateObservers('dishItems');
        this.model.updateObservers('value-total-price');
      }
      //  console.log("this.view after", this.view, this.model);
    });
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
