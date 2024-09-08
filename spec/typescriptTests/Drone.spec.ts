import { Drone } from "../../typescript/Drone.js";
import { Insect } from "../../typescript/Insect.js";

describe("Drone", () => {
  let drone: Drone;

  beforeEach(() => {
    // Create a new Drone instance before each test
    drone = new Drone();
  });

  it("should have correct initial healthPoints", () => {
    expect(drone.getHealth()).toBe(50);
  });

  it("should take damage correctly", () => {
    drone.takeDamage();
    expect(drone.getHealth()).toBe(38); // 50 - 12 = 38
  });

  it("should be a subclass of Insect", () => {
    expect(drone).toBeInstanceOf(Insect);
  });
});
