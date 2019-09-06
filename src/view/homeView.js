class HomeView {
  constructor(container) {
    this.container = container;
    this.startBtn = null;
  }

  render() {
    var self = this;
    var content = /* template */ `
    
    <div class="container text-center full-vh d-flex align-items-center justify-content-center flex-column">
        <p class="text-center p-max-width">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
          magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
          arcu. Maecenas a efficitur leo.
        </p>
        <div class="spacing-medium"></div>
        <a id="startBtn" class="button btn btn-lg btn-primary-color" onClick="location.href='../screens/searchScreen.html';">
          Create new dinner
        </a>
      </div>
    `;

    this.container.innerHTML = content;

    this.afterRender();
  }

  afterRender() {
    this.startBtn = this.container.querySelector("#startBtn");
  }
}
