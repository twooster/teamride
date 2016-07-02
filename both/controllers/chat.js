ChatController = AppController.extend({
  data: function() {
    let ride = Rides.findOne({ _id: this.params.rideId });
    return {
      ride:     ride,
      users:    Users.find({ _id: { $in: ride.userIds }}),
      messages: Messages.find({ rideId: this.params.rideId },
                              { sort: { timestamp: 'desc' } })
    };
  },
  /*
  onAfterAction: function() {
    Meta.setTitle('Dashboard');
  }
 */
});
