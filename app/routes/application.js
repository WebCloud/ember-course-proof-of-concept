import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),
  actions: {
    logout() {
      this.get('authentication').logout();
      this.transitionTo('index');
    },

    deleteUser() {
      this.get('authentication.currentUser')
        .destroyRecord()
        .then(() => this.get('authentication').logout())
        .then(() => this.transitionTo('index'));
    }
  }
});
