"use strict";

var Nightmare = require("nightmare");
var expect = require("chai").expect;

describe("BETter", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 30 seconds to have time to load the pages
  var login = "#signin";

  this.timeout(30000);
  it("should require me to login", function(done) {
    // ID for the login button.
    Nightmare({ show: false })
      .goto('http://localhost:3000/')
      // Just to be safe.
      .wait(login)
      // Click the login button.
      .click(login)
      // Evaluate the title
      .evaluate(function() {
        return document.title;
      })
      // Asset the title is as expected
      .then(function(title) {
        expect(title).to.equal("BETter");
        done();
      });
  });

  it("should log me in", function(done) {
    Nightmare({ show: false })
      .goto('http://localhost:3000/')
      // Just to be safe.
      .wait(login)
      // Click the login button.
      .click(login)
      // Wait for the login input
      .wait("#email")
      // Actually log in
      .type("#email", "email@email.com")
      .type("#password", "your password")
      .click("submit")
      // Evaluate the following selector
      .evaluate(function() {
        // Assert the catalog exists
        return document.URL
      })
      .then(function(catalog) {
        expect(catalog).to.not.equal("http://localhost:3000");
        done();
      });
  });

  it("should ", function() {
    throw new Error(
      "Failed on purpose, just to make the Mocha output more interesting."
    );
  });
});