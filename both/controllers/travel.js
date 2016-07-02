MatchController = AppController.extend({
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }
});

MatchController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
