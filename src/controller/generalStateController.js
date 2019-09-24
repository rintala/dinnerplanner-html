class GeneralStateController {
  constructor(model) {
    this.model = model;
    this.views = {};
    this.pages = {};

    this.renderPage = this.renderPage.bind(this);
    window.addEventListener("hashchange", this.renderPage);
  }

  addPage(data) {
    this.pages[data.path] = {
      controller: data.controller,
      hasSideBar: data.hasSideBar
    };
  }

  renderPage(path) {
    let hash = window.location.hash;
    if (!hash) {
      this.pages[path].controller.renderView();
    } else {
      //This has to be updated to some kind of regex to support parameters like ID
      const qIndex = hash.indexOf("?");
      if (qIndex > 0) {
        hash = hash.substring(1, qIndex);
      } else {
        hash = hash.substring(1, hash.length);
      }

      this.pages[hash].controller.renderView();
      console.log("this.pages[hash].hasSideBar", this.pages[hash].hasSideBar);
      if (this.pages[hash].hasSideBar) {
        this.pages["sidebar"].controller.renderView();
      } else {
        console.log(this.pages["sidebar"]);
        this.pages["sidebar"].controller.hideView();
      }
    }
  }

  /* displayView(viewName) {
    // show view here somehow
    document.getElementById(viewName).style.display = "block";
  }

  hideView(viewName) {
    document.getElementById(viewName).style.display = "none";
  } */
}
