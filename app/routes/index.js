import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),
  beforeModel() {
    const isAuthenticated = this.get('authentication.isAuthenticated');

    if (isAuthenticated) {
      this.transitionTo('authenticated');
    }
  },
});
