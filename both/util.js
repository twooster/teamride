Meteor.findRequestsIn = function(userId, startPoint, endPoint) {
  return Rides.find({
    leaderId: {$ne: userId},
    rejects: {$nin: [userId]},
    startPoint: { $near: {
      $geometry: {
        type: "Point",
        coordinates: startPoint
      },
      $maxDistance: 2000
    }},
    endPoint: { $near: {
      $geometry: {
        type: "Point",
        coordinates: endPoint
      },
      $maxDistance: 5000
    }}
  });
};
