Accounts.registerLoginHandler('the-great-masquerade', function(data) {
  if (typeof data.userId === 'undefined') { return; }

  return { userId: data.userId };
});

Meteor.methods({
  'makeMeAUser': function(params) {
    return Users.insert(params);
  },
});
