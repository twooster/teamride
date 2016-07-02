Accounts.registerLoginHandler('the-great-masquerade', function(data) {
  if (typeof data.userId === 'undefined') { return; }

  return { userId: data.userId };
});

Meteor.methods({
  // TODO[tmw] slightly improve upon LinkedIn level of security
  'loginAsId': function(id) {
    if (!Users.findOne(id)) {
      this.setUserId(null);
    } else {
      this.setUserId(id);
    }
  }
});
