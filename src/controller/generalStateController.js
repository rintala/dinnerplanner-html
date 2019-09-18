class GeneralStateController {
  constructor(view, model) {
    this.views = {};
  }

  setView(viewName, view) {
    this.views[viewName] = view;
    const viewToRender = this.views[viewName];
    viewToRender.render();
  }

  displayView(viewName) {
    // show view here somehow
    document.getElementById(viewName + "Page").style.display = "block";
  }

  hideAllViews() {
    console.log("hide all views");
    Array.from(document.getElementsByClassName("viewContainer")).forEach(
      view => (view.style.display = "none")
    );
  }
}
