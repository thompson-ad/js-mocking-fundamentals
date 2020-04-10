const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

// this function accepts an implementation and returns a function that return that implementation with the arguments
// it also keeps track of all the arguments that it's been called with so we can make an assertion on how that function has been called.

function fn(impl = () => {}) {
  // create our own mock function that takes any number of args
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    // return the impl forwarding on the args
    return impl(...args);
  };

  mockFn.mock = { calls: [] };
  return mockFn;
}

const originalGetWinner = utils.getWinner;
utils.getWinner = fn((p1, p2) => p1);

const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["Kent C. Dodds", "Ken Wheeler"],
  ["Kent C. Dodds", "Ken Wheeler"],
]);

// cleanup
utils.getWinner = originalGetWinner;
