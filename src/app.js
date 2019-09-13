window.onload = () => {
  //We instantiate our model
  /*   const model = new DinnerModel(); */
  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * query for elements in the whole document.
   * In other places you should limit the search only to the children
   * of the specific view you're working with (see exampleView.js).
   */
  console.log('%cstart', 'font-size: 4rem;');
  //We instantiate our model
  const model = new DinnerModel();

  router = {
    overview: 'url',
    search: 'url'
  };

  const container = document.getElementsByClassName('page-content')[0];
  const view = new OverviewView(container, model);

  view.render();
};
