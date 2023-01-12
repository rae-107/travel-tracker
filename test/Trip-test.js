import { expect } from "chai";
import Trip from "../src/Trip";
import tripData from "../src/data/trips";

describe("Trip", () => {
  let trip;

  beforeEach(() => {
    trip = new Trip(tripData.slice(0, 1)[0]);
  });

  it("Should be a function", () => {
    expect(Trip).to.be.a("function");
  });

  it("Should be an instance of Trip", () => {
    expect(trip).to.be.an.instanceOf(Trip);
  });

  it("Should have a property of id", () => {
    expect(trip.id).to.equal(1);
  });

  it("Should have a property of userID", () => {
    expect(trip.userID).to.equal(3);
  });

  it("Should have a property of destination id", () => {
    expect(trip.destinationID).to.equal(2);
  });

  it("Should have a property of number of travelers", () => {
    expect(trip.travelers).to.equal(1);
  });

  it("Should have a property of date", () => {
    expect(trip.date).to.equal("2022/09/16");
  });

  it("Should have a property of duration", () => {
    expect(trip.duration).to.equal(8);
  });

  it("Should have a status property", () => {
    expect(trip.status).to.equal("approved");
  });

  it("Should have a suggestedActivities property that is an empty array", () => {
    expect(trip.suggestedActivities).to.deep.equal([]);
  });
});