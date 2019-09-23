class HomeController {
  constructor(view, model, generalStateController) {
    this.view = view;
    this.model = model;
    this.generalStateController = generalStateController;
    const self = this;
    // TODO lab 3
    this.renderView(self);
  }

  renderView(self) {
    this.view.render();
    /* console.log("self", self.generalStateController); */
    console.log("thisview", this.view);
    this.view.startButton.addEventListener("click", () => {
      self.generalStateController.hideAllViews();
      self.generalStateController.displayView("sideBar");
      self.generalStateController.displayView("search");
    });
    // TODO lab 3
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
/* 
class HomeController {

  constructor(container, model) {
      this.container = container
      this.model = model
      this.view = new Home(this.container, this.model)
      this.render()
      this.test = 'testing'
      console.log('model: ', this.model)
  }

  async render() {
      await this.view.render()
      document.getElementById('testBtn').addEventListener("click", this.onClickFunction.bind(this))
  }

  onClickFunction() {
      this.model.increaseCounter()
      document.getElementById('counter').innerHTML = this.model.getCount()
  }

} */
