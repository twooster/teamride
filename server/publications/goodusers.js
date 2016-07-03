Meteor.publish(null, function() {
  return Users.find({}, {
    fields: {
      name: 1,
      location: 1,
      destination: 1,
      image: 1
    }
  });
});
