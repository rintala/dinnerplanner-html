window.onload = function() {
  console.log("start");
  //We instantiate our model
  const model = new DinnerModel();

  const container = document.getElementsByClassName("page-content")[0];
  const view = new OverviewView(container, model);
  view.render();

  const generalStateController = new GeneralStateController();

  //views
  const homeView = new HomeView(document.getElementById("homePage"));
  const homeViewController = new HomeController(
    homeView,
    model,
    generalStateController
  );

  // set views to controller
  generalStateController.setView("home", homeView);

  // set screens to controller
  displayPage = pageName => {
    generalStateController.displayView(pageName);
  };

  displayPage("home");
};
