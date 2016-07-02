Meteor.methods({
  'Messages.insert': function(params) {
    Messages.insert(Object.assign(params, {
      userId: Meteor.userId(),
      timestamp: moment().valueOf()
    }));
  }
});
