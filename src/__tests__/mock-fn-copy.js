const thumbWar = require("../thumb-war");
const utils = require("../utils");

test("returns winner", () => {
  const originalGetWinner = utils.getWinner;

  // jest has a function called fn - you can provide it an implementation which is called a mock function
  //  it keeps track of what arguments it was called with
  utils.getWinner = jest.fn((p1, p2) => p1);

  const winner = thumbWar("Aaron", "Nayf");
  expect(winner).toBe("Aaron");
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  expect(utils.getWinner).toHaveBeenCalledWith("Aaron", "Nayf");
  console.log(utils.getWinner.mock);
  expect(utils.getWinner.mock.calls).toEqual([
    ["Aaron", "Nayf"],
    ["Aaron", "Nayf"],
  ]);

  utils.getWinner = originalGetWinner;
});
