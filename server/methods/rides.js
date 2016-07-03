Meteor.findRequestsIn = function(userId, startPoint, endPoint) {
  return Rides.find({
    userId: {$ne: userId},
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

Meteor.methods({
  'acceptRequest': function(rideId) {
    let userId = Meteor.userId();
    if (!userId) { return; }

    let ride = Rides.findOne(rideId);
    if (!ride) {
      throw new Meteor.Error(404, 'Ride not found');
    }

    if (!ride.pendingRequest) {
      throw new Meteor.Error(401, 'No pending request');
    }

    if (userId !== ride.leaderId) {
      throw new Meteor.Error(401, 'Bad monkey');
    }

    Rides.update({ _id: ride._id }, {
      $set:   { pendingRequest: null },
      $push:  { userIds: ride.pendingRequest }
    });
  },

  'rejectRequest': function(rideId) {
    let userId = Meteor.userId();
    if (!userId) { return; }

    let ride = Rides.findOne(rideId);
    if (!ride) {
      throw new Meteor.Error(404, 'Ride not found');
    }

    if (!ride.pendingRequest) {
      throw new Meteor.Error(401, 'No pending request');
    }

    if (userId !== ride.leaderId) {
      throw new Meteor.Error(401, 'Bad monkey');
    }

    Rides.update({ _id: ride._id }, {
      $set:   { pendingRequest: null },
      $push:  { rejects: ride.pendingRequest }
    });
  },

  'rejectRide': function(rideId) {
    let userId = Meteor.userId();
    if (!userId) { return; }

    let ride = Rides.findOne(rideId);
    if (!ride) {
      throw new Meteor.Error(404, 'Ride not found');
    }

    var set = {};
    if (ride.pendingRequest === userId) {
      set.pendingRequest = null;
    }

    Rides.update({ _id: ride._id }, {
      $set:   set,
      $push:  { rejects: userId }
    });
  },

  'requestRide': function(rideId) {
    let userId = Meteor.userId();
    //if (!userId) { return; }

    let ride = Rides.findOne(rideId);
    if (!ride) {
      throw new Meteor.Error(404, 'Ride not found');
    }

    if (ride.pendingRequest) {
      throw new Meteor.Error(403, 'Already a pending request');
    }

    if (_.contains(ride.rejects, userId)) {
      throw new Meteor.Error(403, 'Already rejected from ride');
    }

    Rides.update({ _id: ride._id, pendingRequest: null }, {
      $set: {
        pendingRequest: userId
      }
    });
  },

  'checkForRide': function(startPoint, endPoint) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(400, "All the things");
    }
    if(!startPoint || !endPoint) {
      throw new Meteor.Error(400, 'Pls send me params n00b');
    }
    return Meteor.findRequestsIn(Meteor.userId(), startPoint, endPoint)
  }
})
