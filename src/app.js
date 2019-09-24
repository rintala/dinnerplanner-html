window.onload = function() {
  // check if config file is present
  if (typeof config == 'undefined') {
    const configMissingView = new ConfigMissingView(document.getElementById('configMissingPage'));
    configMissingView.render();
    this.console.log('Config file is missing.');
  } else {
    //We instantiate our model
    this.console.log('LOADING NEW WINDOW');
    const model = new DinnerModel();
    const generalController = new GeneralStateController(model);

    const homeController = new HomeController(
      new HomeView(document.querySelector('#app'), model),
      model
    );
    const detailsController = new DetailsController(
      new DetailsView(document.querySelector('#app'), model),
      model
    );
    // const overview = new OverviewController(
    //   new OverviewView(document.querySelector('#app'), model),
    //   model
    // );
    // const printout = new PrintoutController(
    //   new PrintoutView(document.querySelector('#app'), model),
    //   model
    // );
    const search = new SearchController(
      new SearchView(document.querySelector('#app'), model),
      model
    );

    const sideBar = new SideBarController(
      new SideBarView(document.querySelector('#sidebar'), model),
      model
    );

    generalController.addPage({ path: 'search', controller: search });
    generalController.addPage({ path: 'home', controller: homeController });
    generalController.addPage({ path: 'details', controller: detailsController });
    // generalController.addPage({ path: 'overview', controller: overview });
    // generalController.addPage({ path: 'printout', controller: printout });

    generalController.renderPage();
  }
};
