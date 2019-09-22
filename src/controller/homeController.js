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
