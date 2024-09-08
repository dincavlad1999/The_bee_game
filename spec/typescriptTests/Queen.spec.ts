import { Queen } from "../../typescript/Queen";
import { Insect } from "../../typescript/Insect";

describe("Queen", () => {
  let queen: Queen;

  beforeEach(() => {
    // Create a new Queen instance before each test
    queen = new Queen();
  });

  it("should have correct initial healthPoints", () => {
    expect(queen.getHealth()).toBe(100); // 100
  });

  it("should take damage correctly", () => {
    queen.takeDamage();
    expect(queen.getHealth()).toBe(92); // 100 - 8 = 92
  });

  it("should be a subclass of Insect", () => {
    expect(queen).toBeInstanceOf(Insect);
  });
});
