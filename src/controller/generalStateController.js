class GeneralStateController {
  constructor(model) {
    this.model = model;
    this.views = {};
    this.pages = {};

    this.renderPage = this.renderPage.bind(this);
    window.addEventListener('hashchange', this.renderPage);
  }

  addPage(data) {
    this.pages[data.path] = data.controller;
  }

  renderPage() {
    const hash = window.location.hash;
    if (!hash) {
      this.pages['home'].renderView();
    } else {
      //This has to be updated to some kind of regex to support parameters like ID
      const qIndex = hash.indexOf('?');
      if (qIndex > 0) {
        this.pages[hash.substring(1, qIndex)].renderView();
      } else {
        this.pages[hash.substring(1, hash.length)].renderView();
      }
    }
  }
}
