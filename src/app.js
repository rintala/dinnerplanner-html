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
      .then(dish2 => {
        model.addDishToMenu(dish2);
        model.setCurrentDish(dish2);
      })
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
        const sideBarView = new SideBarView(
          document.getElementById("sideBarPage"),
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
        generalStateController.setView("sideBar", sideBarView);

        // display view via controller
        displayPage = pageName => {
          generalStateController.displayView(pageName);
        };

        displayPage("sideBar");

        // TODO: currently have to put this init after render is called - try to modify structure
        const sideBarController = new SideBarController(
          sideBarView,
          model,
          generalStateController
        );

        // hide all views initially
        generalStateController.hideAllViews();

        // then start by displaying the home page
        generalStateController.displayView("details");
      });
  }
};
