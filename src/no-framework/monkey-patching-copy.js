const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

// to mock out getWinner we can assign it a new function that always takes in p1, p2 and return p1

// Now every time we run our test it's going to pass
// we have now made our test deterministic
const originalGetWinner = utils.getWinner;
utils.getWinner = (p1, p2) => p1;

const winner = thumbWar("Aaron", "Nayf");
assert.strictEqual(winner, "Aaron");

// an important part of mocking is to cleanup after yourself
utils.getWinner = originalGetWinner;
