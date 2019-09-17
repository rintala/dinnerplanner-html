cutOverflowingText = (text, numberOfChars) => {
  console.log("cut overflowing text", numberOfChars);
  if (text.length > numberOfChars) {
    return text.substr(0, numberOfChars) + "...";
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
