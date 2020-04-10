const thumbWar = require("../thumb-war");
const utils = require("../utils");

test("returns winner", () => {
  // having to keep track of the original getWinner and restoring it at the end of the test is kind of annoying
  // jest.spyOn with utils passed as the oobject and getwinner as the method
  jest.spyOn(utils, "getWinner");
  // mock functions have an additional method called mockImplementation which behaves similar to fn?
  utils.getWinner.mockImplementation((p1, p2) => p1);

  const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
  expect(winner).toBe("Kent C. Dodds");
  expect(utils.getWinner.mock.calls).toEqual([
    ["Kent C. Dodds", "Ken Wheeler"],
    ["Kent C. Dodds", "Ken Wheeler"],
  ]);

  // cleanup
  // instead of restoring use mockRestore
  utils.getWinner.mockRestore();
});
