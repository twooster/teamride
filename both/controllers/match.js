MatchController = AppController.extend({
  onAfterAction: function () {
    Meta.setTitle('Matches');
  }
});

MatchController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
