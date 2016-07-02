Messages = new Mongo.Collection('messages');

/*
 * Schema:
 * userId: sender id
 * timestamp: sent time
 * text: message body
 * rideId: associated ride id
 */

Messages.helpers({
});

