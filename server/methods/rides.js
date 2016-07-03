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

    Messages.insert({
      userId: Meteor.userId(),
      rideId: ride._id,
      text: "Hi, " + Meteor.user().name + " checking in!",
      timestamp: moment().valueOf()
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
})
