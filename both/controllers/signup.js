SignupController = AppController.extend({
  onAfterAction: function () {
    Meta.setTitle('Sign Up');
  }
});

SignupController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
