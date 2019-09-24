var assert = chai.assert;
var expect = chai.expect;

describe("DinnerPlanner App", () => {
  let model = null;
  let homeView = null;
  let searchView = null;
  let overviewView = null;
  let sideBarView = null;
  let sideBarController = null;
  let detailsView = null;
  let detailsController = null;

  beforeEach(() => {
    model = new DinnerModel();
    homeView = new HomeView(document.querySelector("#page-content"));
    searchView = new SearchView(document.querySelector("#page-content"), model);
    overviewView = new OverviewView(
      document.querySelector("#page-content"),
      model
    );
    sideBarView = new SideBarView(document.querySelector("#sidebar"), model);
    detailsView = new DetailsView(
      document.querySelector("#page-content"),
      model
    );
  });

  describe("Home View", () => {
    it("has the start button", () => {
      homeView.render();
      const button = document.getElementById("startBtn");
      expect(button).to.not.be.a("null");
    });
  });

  describe("Search view", () => {
    beforeEach(async () => {
      const dish = await model.getDish(559251);
      model.addDishToMenu(dish);
      await sideBarView.render();
      await searchView.render();
    });

    it("has a sidebar", () => {
      const sideBar = document.getElementById("sideBarView");
      //  console.log("doc", document, sideBar);
      expect(sideBar).to.not.be.a("null");
    });

    it("has a dish search container", () => {
      const dishSearch = document.getElementById("dishSearchView");
      expect(dishSearch).to.not.be.a("null");
    });

    it("displays a loading message", done => {
      const loader = document.getElementById("loader");
      expect(loader).to.not.be.a("null");
      done();
    }).timeout(3000);

    it("displays dishes", done => {
      const dishes = document.getElementById("dishItems");
      expect(dishes).to.not.be.a("null");
      done();
    }).timeout(3000);

    it("Has a number of guests value", () => {
      const valueHolders = document.getElementsByClassName("value-num-guests");
      //  console.log("valueholders", valueHolders);
      //  console.log("model.getNumberOfGuests()", model.getNumberOfGuests());
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal("" + model.getNumberOfGuests());
      }
    });

    it("Has data on current dishes", () => {
      const valueHolders = document.getElementsByClassName(
        "value-main-course-name"
      );

      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal("Breakfast Pizza");
      }
    });

    it("Displays the total price correctly", () => {
      const valueHolders = document.getElementsByClassName("value-total-price");
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal(
          "" + model.getTotalMenuPriceForNumberOfPeople()
        );
      }
    });
  });

  describe("Confirmation page", () => {
    beforeEach(async () => {
      const dish = await model.getDish(559251);
      model.addDishToMenu(dish);
      overviewView.render();
    });

    it("exists", () => {
      const overviewContainer = document.getElementById("overviewView");
      expect(overviewView).to.not.be.a("null");
    });

    it("has a print button", () => {
      const printBtn = document.getElementById("toPrintBtn");
      expect(printBtn).to.not.be.a("null");
    });

    it("Has a number of guests value", () => {
      const valueHolders = document.getElementsByClassName("value-num-guests");
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal("" + model.getNumberOfGuests());
      }
    });

    it("Has data on current dishes", () => {
      const valueHolders = document.getElementsByClassName(
        "value-main-course-name"
      );
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal("Breakfast Pizza");
      }
    });

    it("Displays the total price correctly", () => {
      const valueHolders = document.getElementsByClassName("value-total-price");
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal(
          "" + model.getTotalMenuPriceForNumberOfPeople()
        );
      }
    });

    // Own tests
    it("Own: Observes changes in the model correctly", () => {
      model.setNumberOfGuests(6);
      const displayedNumberOfGuests = document.getElementsByClassName(
        "value-num-guests"
      );
      console.log("displayedNumberOfGuests", displayedNumberOfGuests);
      expect(displayedNumberOfGuests[0].value).to.equal(6);
    });
  });

  describe("Sidebar view", () => {
    beforeEach(() => {
      model = new DinnerModel();
      model.setNumberOfGuests(1);
      sideBarView = new SideBarView(document.getElementById("sidebar"), model);
      sideBarController = new SideBarController(sideBarView, model);
      sideBarController.renderView();
    });

    it("Has a number of guests input", () => {
      const input = document.getElementsByClassName("input-num-guests")[0];
      expect(input).to.not.be.a("null");
      expect(input.tagName).to.equal("INPUT");
      expect(input.value).to.equal("1");
    });

    it("Controller modifies the model", () => {
      const input = document.getElementsByClassName("input-num-guests")[0];
      input.value = 5;
      input.dispatchEvent(new Event("input"));
      expect("" + model.getNumberOfGuests()).to.equal("5");
    });

    it("Observer updates the view", () => {
      model.setNumberOfGuests(6);
      const input = document.getElementsByClassName("input-num-guests")[0];
      console.log("input", input);
      expect("" + input.value).to.equal("6");
    });
  });

  describe("Details view", () => {
    beforeEach(async () => {
      model = new DinnerModel();
      let dish = await model.getDish(559251);
      detailsView.render(dish);
      detailsController = new DetailsController(detailsView, model);
      detailsController.addListeners(dish);
    });

    it("Own: Adds dish to menu through user interaction", () => {
      let addDishButton = document.querySelector("#addDishToMenuButton");
      addDishButton.click();
      console.log("add dish button", addDishButton);
      expect(model.getFullMenu().length).to.equal(1);
    });
  });
});
