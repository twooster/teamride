TravelController = AppController.extend({
  onAfterAction: function () {
    Meta.setTitle('Address');
  }
});

TravelController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
