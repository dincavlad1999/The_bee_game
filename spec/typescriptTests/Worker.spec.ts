import { Worker } from "../../typescript/Worker";
import { Insect } from "../../typescript/Insect";

describe("Worker", () => {
  let worker: Worker;

  beforeEach(() => {
    // Create a new Worker instance before each test
    worker = new Worker();
  });

  it("should have correct initial healthPoints", () => {
    expect(worker.getHealth()).toBe(75);
  });

  it("should take damage correctly", () => {
    worker.takeDamage();
    expect(worker.getHealth()).toBe(65); // 75 10 = 65
  });

  it("should be a subclass of Insect", () => {
    expect(worker).toBeInstanceOf(Insect);
  });
});
