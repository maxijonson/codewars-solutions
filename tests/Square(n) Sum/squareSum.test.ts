import { squareSum } from "../../src/Square(n) Sum/squareSum";
// import the type of assertion library you wish to use (Chai recommended)
import { assert } from "chai";

describe("Square(n) Sum", function(){
  it("Should return a number", function() {
    assert.equal(squareSum([1,2]), 5);
    assert.equal(squareSum([0, 3, 4, 5]), 50);
  });
});