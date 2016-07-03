Template.requests.onRendered(function () {
  $(this.firstNode).openModal();
});

Template.requests.onDestroyed(function () {
  $(this.firstNode).closeModal();
  $('.lean-overlay').remove();
});


Template.requests.events({
  'click .send-request': function() {
    let rideId = Template.currentData().requests.fetch()[0]._id;
    $('.send-request').attr('disabled', 'disabled');
    Meteor.call('requestRide', rideId);
  },

  'click .skip-request': function() {
    let rideId = Template.currentData().requests.fetch()[0]._id;
    $('.send-request').attr('disabled', 'disabled');
    $('.skip-request').attr('disabled', 'disabled');
    Meteor.call('rejectRide', rideId, function(e, r) {
      if (!e) {
        $('#request-modal').closeModal();
      }
    });
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
