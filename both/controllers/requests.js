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
      var req = this.data().requests;
      let user = Meteor.user();
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
          Router.go('/chat/' + id); // => error 404, not found
        });
      }
    }
    this.next()
  },
  onAfterAction: function() {
    Meta.setTitle('Requests');
  }
});
