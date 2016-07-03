Template.requests.onRendered(function () {
  $(this.firstNode).openModal();
});

Template.requests.events({
  'click .send-request': function() {
    let rideId = Template.currentData().requests.fetch()[0]._id;
    Meteor.call('requestRide', rideId);
    $('.send-request').attr('disabled', 'disabled');
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
  },
  imageUrl: function() {
    let user = Users.findOne(this.leaderId);
    return user.image;
  }
});
