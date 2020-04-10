# Mocking Fundamentals

Mocking is a big subject and can be confusing but here we are going to break down the jest functionality and build it in node

The general idea behind mocking is that you have a module that's doing something expensive (time or money) and you don't actually want to do it when you are running your tests.

So we are going to mock out the module so that it doesn't actually do it.

We are going to mostly be working in the source dir.

We are trying to test the `thumb-war.js` module. It uses the `getWinner` function from `utils` to figure out the winner.

We want to mock out the `getWinner` function.

There are various ways to do it. We start out by monkey patching, and then we become a little more sophisticated and advanced.

We have our Jest tests in the `__tests__` folder and we have the equivalent `no-framework` tests too.

We start in the jest test side and try to implement the same features with no framework after.

## src/monkey-patching.js

```JS
const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

const winner = thumbWar("Aaron", "Nayf");
assert.strictEqual(winner, "Aaron");
```

running `npm run test:watch` will give you a random pass or fail because the utils function is random.

let's mock it out

### Monkey Patching

overiding the getWinner property to make the call deterministic for our test

```JS
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
// so that other tests that may want to use this module can use it in an unmodified state
utils.getWinner = originalGetWinner;
```

## src/_tests_/mock-fn.js

using the jest `fn` method

```JS
const thumbWar = require("../thumb-war");
const utils = require("../utils");

test("returns winner", () => {
  const originalGetWinner = utils.getWinner;

  // jest has a function called fn - you can provide it an implementation which is called a mock function
  //  it keeps track of what arguments it was called with
  utils.getWinner = jest.fn((p1, p2) => p1);

  const winner = thumbWar("Aaron", "Nayf");
  expect(winner).toBe("Aaron");
  console.log(utils.getWinner);
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  expect(utils.getWinner).toHaveBeenCalledWith("Aaron", "Nayf");

  utils.getWinner = originalGetWinner;
});
```

## src/no-framework/mock-fn.js

## src/_tests_/spy.js

## src/no-framework/spy.js

## src/tests/inline-module.js

## src/no-framework/inline-module.js
