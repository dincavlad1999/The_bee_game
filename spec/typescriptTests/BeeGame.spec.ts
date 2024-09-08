import { BeeGame } from "../../typescript/BeeGame";
import { Drone } from "../../typescript/Drone";
import { Insect } from "../../typescript/Insect";
import { InsectType } from "../../typescript/InsectType";
import { Queen } from "../../typescript/Queen";
import { Worker } from "../../typescript/Worker";
import { SessionStorage } from "../../typescript/SessionStorage";

//I did this because sessionStorage is not supported by jasmine
// because it runs in node.js envorinment and there is no way to access browser specific APIS.

const mockSessionStorage = {
  data: {} as any,
  getItem: (key: string) => mockSessionStorage.data[key] || null,
  setItem: (key: string, value: string) => {
    mockSessionStorage.data[key] = value;
  },
  removeItem: (key: string) => {
    delete mockSessionStorage.data[key];
  },
  clear: () => {
    mockSessionStorage.data = {};
  },
};

Object.defineProperty(globalThis, "sessionStorage", {
  value: mockSessionStorage,
  writable: true,
});

describe("BeeGame", () => {
  let game: BeeGame;

  beforeEach(() => {
    game = BeeGame.createBeeGame();
  });

  it("should initialize with a swarm of bees", () => {
    const insects = game.getInsects();
    expect(insects.length).toBe(14);
    expect(insects.some((insect) => insect instanceof Queen)).toBe(true);
    expect(insects.some((insect) => insect instanceof Worker)).toBe(true);
    expect(insects.some((insect) => insect instanceof Drone)).toBe(true);
  });

  it("should correctly identify if the queen is dead", () => {
    const insects = game.getInsects();
    const queen = insects.find((insect) => insect instanceof Queen) as Queen;
    if (queen) {
      queen.setHealth(0);
      expect(game.isQueenDead()).toBe(true);
    } else {
      fail("Queen insect is not found");
    }
  });

  it("should correctly determine if some bees are alive", () => {
    const insects = game.getInsects();
    expect(game.isSomeBeeAlive()).toBe(
      insects.some((bee) => bee.getHealth() > 0)
    );
  });

  it("should attack a bee and update the swarm accordingly", async () => {
    const initialSwarmHealth = game.getSwarmHealth();
    const randomIndex = game.getRandomBeeIndex();
    const result = await game.attackBee(randomIndex);

    const attackedBee = game
      .getInsects()
      .find((_, index) => index === randomIndex);
    const isAttackedBeeKilled = attackedBee
      ? attackedBee.getHealth() <= 0
      : false;

    expect(result).toBe(isAttackedBeeKilled);
    expect(game.getSwarmHealth()).toBeLessThan(initialSwarmHealth);
  });

  it("should return the number of alive worker bees", () => {
    const insects = game
      .getInsects()
      .filter((insect) => insect instanceof Worker) as Worker[];
    insects.forEach((worker) => worker.setHealth(0));
    expect(game.getAliveBeeWorkerNumber()).toBe(0);
  });

  it("should return the number of alive drone bees", () => {
    const insects = game
      .getInsects()
      .filter((insect) => insect instanceof Drone) as Drone[];
    insects.forEach((drone) => drone.setHealth(0));
    expect(game.getAliveBeeDroneNumber()).toBe(0);
  });

  it("should check if the bee queen is alive", () => {
    const insects = game.getInsects();
    const queen = insects.find((insect) => insect instanceof Queen) as Queen;
    if (queen) {
      queen.setHealth(0);
      expect(game.isBeeQueenAlive()).toBe(true);
    } else {
      fail("Queen insect is not found");
    }
  });

  it("should return the number of alive bees", () => {
    const initialCount = game.getAliveBeesNumber();
    expect(initialCount).toBe(game.getInsects().length);
  });
});
