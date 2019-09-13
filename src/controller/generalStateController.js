class GeneralStateController {
  constructor(view, model) {
    this.views = {};

    // TODO lab 3
  }

  update(payload) {
    // TODO Lab 3
  }

  renderView(viewToRender) {
    viewToRender.render();
    // TODO lab 3
  }

  // TODO Lab 3
  setView(viewName, view) {
    this.views[viewName] = view;
  }

  displayView(viewName) {
    this.renderView(this.views[viewName]);
  }
}
