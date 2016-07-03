ChatController = AppController.extend({
  data: function() {
    let ride = Rides.find({ _id: this.params.rideId }).fetch()[0];
    if (!ride) { return {}; }
    return {
      ride:     ride,
      users:    Users.find({ _id: { $in: ride.userIds }}).fetch(),
      messages: Messages.find({ rideId: this.params.rideId },
                              { sort: { timestamp: 1 } }).fetch(),
    };
  },
  onAfterAction: function() {
    Meta.setTitle('Chat');
  }
});
