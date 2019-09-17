cutOverflowingText = text => {
  if (text.length > 10) {
    return text.substr(0, 10) + "...";
  }
  return text;
};

displayLoader = () => {
  document.getElementById("loader").style.display = "inline-block";
};

hideLoader = () => {
  document.getElementById("loader").style.display = "none";
};

addingDishesToMenu = (model, id) => {
  return new Promise(resolve => {
    model.getDish(id).then(dish => {
      model.addDishToMenu(dish);
      resolve();
    });
  });
};
