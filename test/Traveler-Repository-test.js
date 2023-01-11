import { expect } from "chai";
import travelerData from "../src/data/travelers";
import TravelerRepo from "../src/Traveler-Repository";

describe("TravelerRepo", () => {
  let travelerRepo;

  beforeEach(() => {
    travelerRepo = new TravelerRepo(travelerData);
  });

  it("Should be a function", () => {
    expect(TravelerRepo).to.be.a("function");
  });
});
