import { expect } from 'chai'
import tripData from '../src/data/trips'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'

describe('Trip', () => {
  let trip
  let traveler

  beforeEach(() => {
    trip = new Trip(tripData)
    traveler = new Traveler({ id: 1, name: "Ham Leadbeater", travelerType: "relaxer" })
  })

  
})