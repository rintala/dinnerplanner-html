class HomeController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  renderView() {
    this.view.render();
    this.addListeners();
  }

  addListeners() {
    //  console.log('Adding event listner');

    document.getElementById('startBtn').addEventListener('click', this.startButtonEvent);
  }

  startButtonEvent() {
    window.location = '#search';
  }

  update(payload) {}
}
