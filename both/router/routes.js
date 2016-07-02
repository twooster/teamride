Router.route('/', {
  controller: 'TravelController'
});

Router.route('/travel', {
  name: 'travel',
  controller: 'TravelController'
});

Router.route('/chat', {
  name: 'chat',
  controller: 'ChatController'
});

Router.route('/match', {
  name: 'match',
  controller: 'MatchController'
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
