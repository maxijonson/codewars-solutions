import { assert } from "chai";
import { addLetters } from "../../src/Alphabetical Addition/addLetters";

describe("Alphabetical Addition", () => {
  const tests = [
    [['a', 'b', 'c'], 'f'],
    [['z'], 'z'],
    [['a', 'b'], 'c'],
    [['c'], 'c'],
    [['z', 'a'], 'a'],
    [['y', 'c', 'b'], 'd'],
    [[], 'z']
  ];
  for (let i = 0; i < tests.length; i++) {
    const str = (<string[]>tests[i][0]).map((x: string) => `"${x}"`).join(', ');
    it(`addLetters(${str})`, () => {
      assert.strictEqual(addLetters(...tests[i][0]), tests[i][1]);
    });
  }
});