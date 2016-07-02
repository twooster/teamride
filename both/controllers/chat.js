ChatController = AppController.extend({
  data: function() {
    let group = Group.findOne({ _id: this.params.groupId });
    return {
      group:     group,
      users:     Meteor.users.find({ _id: {
        $in: group.userIds
      }}),
      messages:  Message.find({ groupId: this.params.groupId },
                              { sort: { timestamp: 'desc' } });
    };
  },
  /*
  onAfterAction: function() {
    Meta.setTitle('Dashboard');
  }
 */
});
