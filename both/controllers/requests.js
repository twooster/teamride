RequestsController = AppController.extend({
  data: function() {
    /*

    let ride = Rides.findOne(this.params.rideId);
    if (!ride) { return {}; }
    return {
      ride:     ride,
      users:    Users.find({ _id: { $in: ride.userIds }}).fetch(),
      messages: Messages.find({ rideId: this.params.rideId },
                              { sort: { timestamp: 1 } }).fetch(),
    };
   */
  },
  onAfterAction: function() {
    Meta.setTitle('Chat');
  }
});
