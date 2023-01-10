import { expect } from 'chai';
import travelerData from  '../src/data/travelers'
import Traveler from '../src/Traveler'

describe('Traveler', () => {
  let traveler
  
  beforeEach(() => {
    traveler = new Traveler(travelerData)
  })

  it('Should be a function', () => {
    expect(Traveler).to.be.a('function')
  })

})