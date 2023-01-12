class Trip {
  constructor(tripObject) {
    this.id = tripObject.id;
    this.userID = tripObject.userID;
    this.destinationID = tripObject.destinationID;
    this.travelers = tripObject.travelers;
    this.date = tripObject.date;
    this.duration = tripObject.duration;
    this.status = tripObject.status;
    this.suggestedActivities = tripObject.suggestedActivities;
  }
}

export default Trip;