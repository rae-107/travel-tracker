import { expect } from "chai";
import travelerData from "../src/data/travelers";
import TravelerRepository from "../src/Traveler-Repository";
import TravelerRepo from "../src/Traveler-Repository";

describe("TravelerRepo", () => {
  let travelerRepo;

  beforeEach(() => {
    travelerRepo = new TravelerRepo(travelerData);
  });

  it("Should be a function", () => {
    expect(TravelerRepo).to.be.a("function");
  });

  it('Should be an instance of Traveler', () => {
    expect(travelerRepo).to.be.an.instanceOf(TravelerRepository)
  })
});
