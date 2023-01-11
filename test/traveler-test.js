import { expect } from 'chai';
import travelerData from  '../src/data/travelers'
import Traveler from '../src/Traveler'

describe('Traveler', () => {
  let traveler
  
  beforeEach(() => {
    traveler = new Traveler(travelerData[0])
    // traveler2 = new Traveler(travelerData[1])
  })

  it('Should be a function', () => {
    expect(Traveler).to.be.a('function')
  })

  it('Should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler)
  })

  it('Should have an id', () => {
    expect(traveler.id).to.equal(1)
  })
})