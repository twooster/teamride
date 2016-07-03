Template.requests.onRendered(function () {
  /*
  if (!Template.subscriptionsReady()) { return; }

  let requests = this.requests.fetch();
  if (!requests.length) {
    if (!this.timeout) {
      this.timeout = Meteor.setTimeout(function() {
        // transfer to "waiting for people screen"
      }, 3000);
    }
  } else if (this.timeout) {
    Meteor.clearTimeout(this.timeout);
  }
 */
});

Template.requests.events({
  'click .request': function() {
    let rideId = Template.currentData().requests.fetch()[0]._id;
    Meteor.call('requestRide', rideId);
  },

  'click .skip': function() {
    let rideId = Template.currentData().requests.fetch()[0]._id;
    Meteor.call('rejectRide', rideId);
  }
});

Template.requests.helpers({
  request: function() {
    return this.requests.fetch()[0];
  },
  name: function() {
    let user = Users.findOne(this.leaderId);
    return user.name;
  }
  imageUrl: function() {
    let user = Users.findOne(this.leaderId);
    return user.image;
  }
});
