window.onload = function() {
  // check if config file is present
  if (typeof config == 'undefined') {
    const configMissingView = new ConfigMissingView(document.getElementById('configMissingPage'));
    configMissingView.render();
    this.console.log('Config file is missing.');
  } else {
    //We instantiate our model
    const model = new DinnerModel();
    const generalController = new GeneralStateController(model);
  }
};
