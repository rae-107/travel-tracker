import { expect } from 'chai';
import travelerData from  '../src/data/travelers'
import Traveler from '../src/Traveler'

describe('Traveler', () => {
  let traveler
  
  beforeEach(() => {
    traveler = new Traveler(travelerData[0])
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
  
  it('Should have a name', () => {
    expect(traveler.name).to.equal('Ham Leadbeater')
  })

  it('Should have a traveler type', () => {
    expect(traveler.travelerType).to.equal('relaxer')
  })

  it('Should keep track of amount spent on trips plus 10% agent fee, should default to zero', () => {
    expect(traveler.amountSpent).to.equal(0)
  })
})