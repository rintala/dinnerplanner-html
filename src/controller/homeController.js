class HomeController {
  constructor(view, model, generalStateController) {
    this.view = view;
    this.model = model;
    this.controller = generalStateController;

    // TODO lab 3
  }

  renderView() {
    this.view.render();
    // TODO lab 3
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
