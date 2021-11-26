import { expect } from "chai";
import { elementInView } from "./js/main";

// const assert = require("assert");

// eslint-disable-next-line no-undef
describe("elementInView - Basic Functionality", () => {
  // eslint-disable-next-line no-undef
  it("shows element", () => {
    const expected = 100;
    // eslint-disable-next-line no-undef
    const actual = elementInView(el, (scrollOffset = 100));
    // assert.equal(actual, 100);
    expect(actual).to.deep.equal(expected);
  });
});
