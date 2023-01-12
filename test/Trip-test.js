import { expect } from "chai";
import Trip from '../src/Trip'  
import tripData from '../src/data/trips'

describe('Trip', () => {
  let trip

  beforeEach(() => {
    trip = new Trip(tripData.slice(0, 1))
  })

  it("Should be a function", () => {
    expect(Trip).to.be.a("function");
  });

  it('Should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceOf(Trip)
  }) 
})