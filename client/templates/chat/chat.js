Template.chat.events({
  'submit .chat-form': function(e, t) {
    e.preventDefault();
    let data = Template.currentData();
    console.log(this);

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
