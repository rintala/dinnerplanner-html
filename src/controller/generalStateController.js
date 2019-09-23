class GeneralStateController {
  constructor(model) {
    this.model = model;
    this.views = {};
    this.pages = {
      home: new HomeController(new HomeView(document.createElement('div'), this.model), model),
      details: new DetailsController(
        new DetailsView(document.createElement('div'), this.model),
        model
      ),
      overview: new OverviewController(
        new OverviewView(document.createElement('div'), this.model),
        model
      ),
      printout: new PrintoutController(
        new PrintoutView(document.createElement('div'), this.model),
        model
      ),
      sideBar: new SideBarController(
        new SideBarView(document.createElement('div'), this.model),
        model
      ),
      search: new SearchController(new SearchView(document.createElement('div'), this.model), model)
    };

    this.hashChange = this.hashChange.bind(this);
    window.addEventListener('hashchange', this.hashChange);
    this.hashChange();
  }

  hashChange() {
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
