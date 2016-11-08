import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),

  model() {
    return this.get('authentication')._refreshSession()
      .then((user) => this.store.createRecord('todo', { user }));
  },

  actions: {
    create(todo) {
      todo.save().then(() => this.transitionTo('todo.index'));
    }
  }
});
