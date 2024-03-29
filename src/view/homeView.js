class HomeView {
  constructor(container, model) {
    this.container = container;
    this.startButton = null;
  }

  // An example of creating HTML declaratively. Think about the pros and cons of this approach.
  render() {
    var content = /* template */ `
    <div class="container text-center full-vh d-flex align-items-center justify-content-center flex-column">
        <p class="text-center p-max-width">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
          magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
          arcu. Maecenas a efficitur leo.
        </p>
        <div class="spacing-medium"></div>
        <a id="startBtn" class="button">
          Create new dinner
        </a>
      </div>
    `;
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {
    this.startButton = this.container.querySelector('#startBtn');
  }
}
