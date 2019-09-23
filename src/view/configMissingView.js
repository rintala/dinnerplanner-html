class ConfigMissingView {
  constructor(container) {
    this.container = container;
  }

  render() {
    var content = `
    <div style="display: flex;justify-content: center">
        <div style="font-family: Sofia; font-size: 34px; padding-top:10%; width: 60%">
        Config file is missing. Please follow instructions in readme to add it.
        </div>
    </div>`;

    this.container.innerHTML = content;

    this.afterRender();
  }
  afterRender() {}
}
