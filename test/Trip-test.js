import { expect } from "chai";
import Trip from '../src/Trip'  
import tripData from '../src/data/trips'

describe('Trip', () => {
  let trip

  beforeEach(() => {
    trip = new Trip(tripData.slice(0, 1)[0])
  })

  it("Should be a function", () => {
    expect(Trip).to.be.a("function");
  });

  it('Should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceOf(Trip)
  }) 

  it('Should have a property of id', () => {
    expect(trip.id).to.equal(1)
  })

  it('Should have a property of userID', () => {
    expect(trip.userID).to.equal(3)
  })

  it('Should have a property of destination id', () => {
    expect(trip.destinationID).to.equal(2)
  })

})