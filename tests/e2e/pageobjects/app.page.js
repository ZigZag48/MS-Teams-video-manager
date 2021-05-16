class App {
  /**
   * elements
   */
  get heading() {
    return $("h1");
  }

  /**
   * methods
   */
  open(path = "/#fake") {
    browser.url(path);
  }
}

module.exports = new App();
