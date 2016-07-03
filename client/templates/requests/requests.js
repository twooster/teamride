Template.requests.onRendered(function () {
  if (!Template.subscriptionsReady()) { return; }

  let requests = this.requests.fetch();
  if (!requests.length) {
    if (!this.timeout) {
      this.timeout = Meteor.setTimeout(function() {
        // transfer to "waiting for people screen"
      }, 3000);
    }
  } else if (this.timeout) {
    Meteor.clearTimeout(this.timeout);
  }
});

Template.requests.helpers({
  showRequest: function() {
    return this.requests.fetch().length;
  },

  photos: function() {
    return '';
  }
});
