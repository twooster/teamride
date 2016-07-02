Meteor.loginAsAnyone = function(id) {
  Accounts.callLoginMethod({
    methodArguments: [{
      userId: id
    }]
  });
}
