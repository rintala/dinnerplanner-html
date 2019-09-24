window.onload = function() {
  // check if config file is present
  if (typeof config == "undefined") {
    const configMissingView = new ConfigMissingView(
      document.getElementById("configMissingPage")
    );
    configMissingView.render();
    this.console.log("Config file is missing.");
  } else {
    //We instantiate our model
    this.console.log("LOADING NEW WINDOW");
    const model = new DinnerModel();

    const generalController = new GeneralStateController(model);

    const homeController = new HomeController(
      new HomeView(document.querySelector("#home"), model),
      model
    );
    const detailsController = new DetailsController(
      new DetailsView(document.querySelector("#details"), model),
      model
    );
    const overview = new OverviewController(
      new OverviewView(document.querySelector("#overview"), model),
      model
    );
    const printout = new PrintoutController(
      new PrintoutView(document.querySelector("#printout"), model),
      model
    );
    const search = new SearchController(
      new SearchView(document.querySelector("#search"), model),
      model
    );

    this.console.log(
      "document.querySelector('#sidebar')",
      document.querySelector("#sidebar")
    );
    const sideBar = new SideBarController(
      new SideBarView(document.querySelector("#sidebar"), model),
      model
    );

    generalController.addPage({
      path: "search",
      controller: search,
      hasSideBar: true
    });
    generalController.addPage({
      path: "home",
      controller: homeController,
      hasSideBar: false
    });
    generalController.addPage({
      path: "sidebar",
      controller: sideBar,
      hasSideBar: false
    });
    generalController.addPage({
      path: "details",
      controller: detailsController,
      hasSideBar: true
    });
    generalController.addPage({
      path: "overview",
      controller: overview,
      hasSideBar: false
    });
    generalController.addPage({
      path: "printout",
      controller: printout,
      hasSideBar: false
    });

    generalController.renderPage("home");
    /* generalController.displayView("sidebar"); */
    /* generalController.hideView("sidebar"); */
    /* generalController.sPage("sidebar"); */
  }
};
