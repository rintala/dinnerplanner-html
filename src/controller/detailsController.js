class DetailsController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // TODO lab 3
  }

  renderView() {
    const hash = window.location.hash;
    const idIndex = hash.indexOf('id');
    const id = hash.substring(idIndex + 3, hash.length);
    console.log('Trying to render a details view. ID: ', id);

    this.model.getDish(id).then(dish => {
      this.view.render(dish);
    });

    // TODO lab 3
  }

  update(payload) {
    // TODO Lab 3
  }

  // TODO Lab 3
}
