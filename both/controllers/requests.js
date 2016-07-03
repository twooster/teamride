RequestsController = AppController.extend({
  data: function() {
    let user = Meteor.user();

    if (!user) { return }
    return {
      requests: Meteor.findRequestsIn(
        user._id,
        user.location.coordinates,
        user.destination.coordinates
      )
    };
  },
  onBeforeAction: function() {
    if(this.ready()) {
      let user = Meteor.user();
      let ride = Rides.find({userIds: { $in: [user._id] }}).fetch()[0];
      if (ride) {
        return Router.go('/chat/' + ride._id);
      }

      var req = this.data().requests;
      if(user && req.count() === 0) {
        // build a ride and redirect
        return Rides.insert({
          leaderId: user._id,
          userIds: [user._id],
          pendingRequest: null,
          rejects: [],
          startPoint: user.location,
          endPoint: user.destination
        }, function(e, id) {
          Meteor.call('Messages.insert', {
            rideId: id,
            text: "Hi, I'm " + user.name + ", the ride leader.",
          });
          return Router.go('/chat/' + id); // => error 404, not found
        });
      }
    }
    this.next()
  },
  onAfterAction: function() {
    Meta.setTitle('Requests');
  }
});
