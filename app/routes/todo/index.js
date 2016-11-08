import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),

  model() {
    return this.get('authentication')._refreshSession()
      .then((user) => {
        return this.store.query('todo', { userId: user.id });
      });
  },

  actions: {
    toggleEditing(todo) {
      todo.toggleProperty('isEditing');
    },

    update(todo) {
      todo.save().then(()=> todo.toggleProperty('isEditing'));
    },

    delete(todo) {
      todo.destroyRecord();
    }
  }
});
