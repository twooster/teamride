Router.route('/', {
  controller: 'AppController',
  name: 'home'
});

Router.route('/signup', {
  controller: 'SignupController',
  name: 'signup'
});

Router.route('/travel', {
  name: 'travel',
  controller: 'TravelController'
});

Router.route('/chat/:rideId', {
  name: 'chat',
  controller: 'ChatController'
});

Router.route('/requests', {
  name: 'requests',
  controller: 'RequestsController'
});


/*
Router.route('/dashboard', {
  name: 'dashboard',
  controller: 'DashboardController'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
*/
