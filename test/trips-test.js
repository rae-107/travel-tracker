import { expect } from "chai";
import tripsData from "../src/data/trips";
import destinationData from "../src/data/destinations";
import Traveler from "../src/Traveler";
import Trips from "../src/Trips";

describe("Trips", () => {
  let trips;
  let traveler;

  beforeEach(() => {
    trips = new Trips(tripsData, destinationData);
    traveler = new Traveler({
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer",
    });
  });

  it("Should be a function", () => {
    expect(Trips).to.be.a("function");
  });

  it("Should be an instance of Trip", () => {
    expect(trips).to.be.an.instanceOf(Trips);
  });

  it("Should have a property that contains all trips", () => {
    expect(trips.tripsData).to.deep.equal(tripsData);
  });

  it("Should contain a property that contains all destinations", () => {
    expect(trips.destinationData).to.deep.equal(destinationData);
  });

  it("Should find all trips by a users id", () => {
    expect(trips.getTripsById(3)).to.deep.equal(tripsData.slice(0, 4));
  });

  it("Should return Can't find that user if id doesn't exist", () => {
    expect(trips.getTripsById(51)).to.equal("Can't find that user");
  });

  it("Should find destination by id", () => {
    expect(trips.getDestinationByDestinationId(2)).to.deep.equal({
      id: 2,
      destination: "Stockholm, Sweden",
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 780,
      image:
        "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "city with boats on the water during the day time",
    });
  });

  it("Should return message if can't find destination by id", () => {
    expect(trips.getDestinationByDestinationId(11)).to.equal(
      "Can't find a destination by that id"
    );
  });

  it("Should should be able to calulate how much a traveler has spent on trips this year", () => {
    expect(trips.calculateTripsThisYear(3, "2022/12/04")).to.equal(14762.00);
  });
});