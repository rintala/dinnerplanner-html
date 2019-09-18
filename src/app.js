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
    const model = new DinnerModel();
    model
      .getDish(592479)
      .then(dish1 => model.addDishToMenu(dish1))
      .then(() => model.getDish(818941))
      .then(dish2 => model.addDishToMenu(dish2))
      .then(() => {
        // views
        const homeView = new HomeView(document.getElementById("homePage"));
        const overviewView = new OverviewView(
          document.getElementById("overviewPage"),
          model
        );
        const searchView = new SearchView(
          document.getElementById("searchPage"),
          model
        );
        const detailsView = new DetailsView(
          document.getElementById("detailsPage"),
          model
        );
        const printoutView = new PrintoutView(
          document.getElementById("printoutPage"),
          model
        );

        // controllers
        const generalStateController = new GeneralStateController();
        const homeViewController = new HomeController(
          homeView,
          model,
          generalStateController
        );

        // set views to controller
        generalStateController.setView("home", homeView);
        generalStateController.setView("overview", overviewView);
        generalStateController.setView("search", searchView);
        generalStateController.setView("details", detailsView);
        generalStateController.setView("printout", printoutView);

        // display view via controller
        displayPage = pageName => {
          generalStateController.displayView(pageName);
        };

        displayPage("search");
      });
  }
};
