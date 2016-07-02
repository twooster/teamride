Meteor.methods({
  'checkForRide': function(startPoint, endPoint) {
    if(!startPoint || !endPoint) {
      throw new Meteor.Error(400, 'Pls send me params n00b');
    } 

    return Rides.find({
      userId: {$ne: Meteor.userId()},
      startPoint: { $near: {
        $geometry: {
          type: "Point",
          coordinates: startPoint
        },
        $maxDistance: 5000
      }},
      endPoint: { $near: {
        $geometry: {
          type: "Point",
          coordinates: endPoint
        },
        $maxDistance: 5000
      }}
    });
  }
})
