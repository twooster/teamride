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
  }
});

Template.chat_message_group.helpers({
  incoming: function() {
    return this.type === 'incoming';
  }
});
