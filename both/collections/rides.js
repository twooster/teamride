Rides = new Mongo.Collection('rides');

/*
 * Schema:
 * userIds: [] array of all userIds involved in this chat
 * leaderId: the leader userid
 * createdAt: creation time
 * pendingRequest: userId or null,
 * rejects: []
 */


Rides.helpers({
});
