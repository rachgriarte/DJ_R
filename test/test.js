"use strict";

var Nightmare = require("nightmare");
var expect = require("chai").expect;

describe("Codecademy", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 30 seconds to have time to load the pages
  var login = "#header__sign-in";

  this.timeout(30000);
  it("should require me to login", function(done) {
    // ID for the login button.
    Nightmare({ show: true })
      .goto("https://codecademy.com")
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
        expect(title).to.equal("Log in | Codecademy");
        done();
      });
  });

  it("should present a link to course catalog after login", function(done) {
    Nightmare({ show: true })
      .goto("https://codecademy.com")
      // Just to be safe.
      .wait(login)
      // Click the login button.
      .click(login)
      // Wait for the login input
      .wait("#user_login")
      // Actually log in
      .type("#user_login", "ResilD")
      .type("#user_password", "dummy*password")
      .click("#user_submit")
      // Evaluate the following selector
      .evaluate(function() {
        // Assert the catalog exists
        return document.querySelector("a[href='/learn/all']");
      })
      .then(function(catalog) {
        expect(catalog).to.not.equal(undefined);
        done();
      });
  });

  it("should ", function() {
    throw new Error(
      "Failed on purpose, just to make the Mocha output more interesting."
    );
  });
});