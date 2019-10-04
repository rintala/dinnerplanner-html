class SideBarController {
  constructor(view, model, generalStateController) {
    this.view = view;
    this.model = model;
    this.generalStateController = generalStateController;
    this.renderView = this.renderView.bind(this);
  }

  hideView() {
    this.view.container.innerHTML = '';
  }

  renderView() {
    this.view.render();

    this.view.container.querySelector('#dishesInfo').addEventListener('click', dish => {
      console.log('removing ', dish.target.id);
      this.model.removeDishFromMenu(dish.target.id);
      console.log(this.model.getFullMenu());
    });

    this.view.confirmButton.addEventListener('click', () => {
      window.location = '#overview';
    });
    this.view.inputNumberChanger.addEventListener('input', e => {
      if (!isNaN(parseInt(this.view.inputNumberChanger.value))) {
        this.model.setNumberOfGuests(parseInt(this.view.inputNumberChanger.value));
        this.model.updateObservers('dishesInfo');
        this.model.updateObservers('value-num-guests');
        this.model.updateObservers('dishItems');
        this.model.updateObservers('value-total-price');
      }
    });
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
