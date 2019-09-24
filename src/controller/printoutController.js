class PrintoutController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // TODO lab 3
  }

  renderView() {
    this.view.render();
    // TODO lab 3
    this.view.goBackButton.addEventListener("click", () => {
      window.location = "#search";
    });
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
