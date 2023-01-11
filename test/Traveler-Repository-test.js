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

  it('Should have a property that contains all travelers', () => {
    expect(travelerRepo.data).to.deep.equal(travelerData)
    expect(travelerRepo.data.length).to.equal(10)
  })

  it('Should find a user by id', () => {
    expect(travelerRepo.getTravelerById(1)).to.deep.equal(travelerData[0])
  })

  it('Should return error message if user doesn\'t exist', () => {
    expect(travelerRepo.getTravelerById(11)).to.equal('Can\'t find that user')
  })
});
