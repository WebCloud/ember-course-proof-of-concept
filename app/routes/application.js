import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),
  actions: {
    logout() {
      this.get('authentication').logout();
      this.transitionTo('index');
    }
  }
});
