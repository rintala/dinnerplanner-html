window.onload = function() {
  // check if config file is present
  if (typeof config == 'undefined') {
    const configMissingView = new ConfigMissingView(document.getElementById('configMissingPage'));
    configMissingView.render();
    this.console.log('Config file is missing.');
  } else {
    //We instantiate our model
    const model = new DinnerModel();

    this.readingCookie(model).then(() => {
      this.console.log('creating page, ', model);
      const generalController = new GeneralStateController(model);

      const homeController = new HomeController(
        new HomeView(document.querySelector('#home'), model),
        model
      );
      const detailsController = new DetailsController(
        new DetailsView(document.querySelector('#details'), model),
        model
      );
      const overview = new OverviewController(
        new OverviewView(document.querySelector('#overview'), model),
        model
      );
      const printout = new PrintoutController(
        new PrintoutView(document.querySelector('#printout'), model),
        model
      );
      const search = new SearchController(
        new SearchView(document.querySelector('#search'), model),
        model
      );

      // this.console.log("document.querySelector('#sidebar')", document.querySelector('#sidebar'));
      const sideBar = new SideBarController(
        new SideBarView(document.querySelector('#sidebar'), model),
        model
      );

      generalController.addPage({
        path: 'search',
        controller: search,
        hasSideBar: true
      });
      generalController.addPage({
        path: 'home',
        controller: homeController,
        hasSideBar: false
      });
      generalController.addPage({
        path: 'sidebar',
        controller: sideBar,
        hasSideBar: false
      });
      generalController.addPage({
        path: 'details',
        controller: detailsController,
        hasSideBar: true
      });
      generalController.addPage({
        path: 'overview',
        controller: overview,
        hasSideBar: false
      });
      generalController.addPage({
        path: 'printout',
        controller: printout,
        hasSideBar: false
      });

      generalController.renderPage('home');
      /* generalController.displayView("sidebar"); */
      /* generalController.hideView("sidebar"); */
      /* generalController.sPage("sidebar"); */
    });
  }
};

function readingCookie(model) {
  if (!!document.cookie) {
    const cookie = this.parsingCookie();
    if (!isNaN(parseInt(cookie.guests))) {
      model.setNumberOfGuests(cookie.guests);
    }

    if ((cookie.dishes + '').split(',').length > 0) {
      let dishArray = (cookie.dishes + '').split(',');
      let promiseArray = dishArray.map(dishId => {
        return new Promise(resolve => {
          model.getDish(dishId).then(dish => {
            model.addDishToMenu(dish);
            resolve();
          });
        });
      });
      console.log('does this happen? ', promiseArray);
      return Promise.all(promiseArray);
    }
  } else {
    return new Promise(resolve => {
      resolve();
    });
  }
}

function parsingCookie() {
  return document.cookie.split(';').reduce((res, c) => {
    const [key, val] = c
      .trim()
      .split('=')
      .map(decodeURIComponent);
    try {
      return Object.assign(res, { [key]: JSON.parse(val) });
    } catch (e) {
      return Object.assign(res, { [key]: val });
    }
  }, {});
}
