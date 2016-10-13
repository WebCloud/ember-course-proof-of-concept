import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),
  beforeModel() {
    const isAuthenticated = this.get('authentication.isAuthenticated');

    if (!isAuthenticated) {
      console.error('Not authenticated!');
      this.transitionTo('index');
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('currentUser', this.get('authentication.currentUser'));
  },

  actions: {
    deleteUser() {
      this.get('authentication.currentUser')
        .destroyRecord()
        .then(() => this.get('authentication').logout())
        .then(() => this.transitionTo('index'));
    }
  }
});
