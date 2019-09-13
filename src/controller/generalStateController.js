class GeneralStateController {
  constructor(view, model) {
    this.views = {};
  }

  setView(viewName, view) {
    this.views[viewName] = view;
  }

  displayView(viewName) {
    const viewToRender = this.views[viewName];
    viewToRender.render();
  }
}
