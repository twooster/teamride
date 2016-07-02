ChatController = AppController.extend({
  data: function() {
    let ride = Rides.findOne(this.params.rideId);
    if (!ride) { return {}; }
    return {
      ride:     ride,
      users:    Users.find({ _id: { $in: ride.userIds }}),
      messages: Messages.find({ rideId: this.params.rideId },
                              { sort: { timestamp: 1 } }),
    };
  },
  onAfterAction: function() {
    Meta.setTitle('Chat');
  }
});
