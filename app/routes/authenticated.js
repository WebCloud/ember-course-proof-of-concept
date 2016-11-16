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

  model() {
    return this.get('authentication')._refreshSession()
      .then((user) => {
        return this.store.query('todo', { userId: user.id });
      });
  },

  setupController(controller, model) {
    this._super(controller, model);
    const user = this.get('authentication.currentUser');
    controller.set('currentUser', user);
    controller.set('todo', this.store.createRecord('todo', { user }));
  },

  actions: {
    toggleEditing(todo) {
      todo.toggleProperty('isEditing');
    },

    createTodo(todo) {
      if (todo.get('isInvalid')){
        return;
      }

      const controller = this.controllerFor('authenticated');
      todo.save()
        .then(() => this.refresh());
    },

    updateTodo(todo) {
      if (todo.get('isInvalid')){
        return;
      }

      todo.save().then(()=> todo.toggleProperty('isEditing'));
    },

    deleteTodo(todo) {
      todo.destroyRecord();
    }
  }
});
