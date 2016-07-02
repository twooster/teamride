Template.chat_message.onRendered(function() {
  Meteor.setTimeout(function() {
    window.scrollTo(0, document.body.scrollHeight);
  }, 0);
});

Template.chat.events({
  'submit .chat-form': function(e, t) {
    e.preventDefault();
    let data = Template.currentData();

    let text = String(t.$('input[name="message"]').val()).trim();
    if (text) {
      Meteor.call('Messages.insert', {
        rideId: this.ride._id,
        text: text
      });
      t.$('input[name="message"]').val('');
    }
  },
});

Template.chat.helpers({
  groupedMessages: function() {
    if (!Template.instance().data) { return }
    let groupedMessages = [];
    // {
    //   type: 'incoming' / 'outgoing',
    //   userId: xxxx,
    //   messages: []
    // }
    let lastGroup = {};
    let lastTimestamp = -Infinity;
    let messages = Template.instance().data.messages;
    _.each(this.messages.fetch(), function(msg) {
      if (!lastGroup ||
          msg.userId !== lastGroup.userId ||
          (msg.timestamp - lastTimestamp) > 10 * 1000) {
        if (lastGroup) {
          groupedMessages.push(lastGroup);
        }
        lastGroup = {
          type: msg.userId === Meteor.userId() ? 'outgoing' : 'incoming',
          userId: msg.userId,
          messages: []
        };
      }
      lastTimestamp = msg.timestamp;
      lastGroup.messages.push(msg);
    });

    if (lastGroup) {
      groupedMessages.push(lastGroup);
    }
    return groupedMessages;
  },

  hasPendingRequest: function() {
    let ride = Template.instance().data.ride;
    if (!ride) { return }

    if (Meteor.userId() == ride.leaderId && ride.pendingRequest) {
      return true;
    }
  },
});

Template.chat_message_group.helpers({
  incoming: function() {
    return this.type === 'incoming';
  }
});

Template.pending_request.helpers({
  userPhoto: function() {
    if (!this.pendingRequest) { return; }

    let user = Users.findOne(this.pendingRequest);
    if (!user) { return; }

    return user.image;
  },
});

Template.pending_request.events({
  'click .accept': function(e) {
    e.preventDefault();
    Meteor.call('acceptRequest', this.ride._id);
  },

  'click .reject': function(e) {
    e.preventDefault();
    Meteor.call('rejectRequest', this.ride._id);
  },
});
