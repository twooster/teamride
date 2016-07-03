Meteor.startup(function() {
  Users.remove({});
  Rides.remove({});
  Messages.remove({});

  let theLoft = [52.5058605, 13.3932209];
  const destinations = [
    [52.5088605, 13.3918209],
    [52.5085805, 13.3918609],
  ];

  function aroundPoint(latLng, variance) {
    variance = variance || 0.000001;
    return {
      lat: latLng[0] + _.random(-variance, +variance),
      lng: latLng[1] + _.random(-variance, +variance)
    };
  }

  Factory.define('user', Users, {
    name: function() {
      return Fake.word() + ' ' + Fake.word();
    },
    location: function() {
      return aroundPoint(theLoft);
    },
    destination: function() {
      return aroundPoint(_.sample(destinations));
    },
    destinationText: function() {
      return Fake.sentence();
    }
  });

  Factory.define('ride', Rides, {
    userIds: function() {
      let users = [];
      _(_.random(1, 3)).times(function() {
        users.push(Factory.create('user')._id);
      });
      return users;
    },
    leaderId: function() {
      return _.sample(this.userIds);
    },
    createdAt: function() {
      return moment().valueOf();
    },
    rejects: function() {
      return [];
    },
    pendingRequest: null,
    active: true,
  });

  Factory.define('message', Messages, {
    rideId: function() { throw new Error('foo') }, //Factory.get('ride'),
    userId: function() { throw new Error('foo') }, //Factory.get('user'),
    timestamp: function() {
      return moment().valueOf();
    },
    text: function() {
      return Fake.sentence();
    }
  });

  /*
  if (Rides.find({}).count() === 0) {
    _(3).times(function(n) {
      let ride = Factory.create('ride');
      _(_.random(2, 8)).times(function() {
        Factory.create('message', {
          rideId: ride._id,
          userId: _.sample(ride.userIds),
        });
      });
    });
  }
 */

  console.log("Rides:\n\n", Rides.find({}).fetch());
//  console.log("Users:\n\n", Users.find({}).fetch());
});
