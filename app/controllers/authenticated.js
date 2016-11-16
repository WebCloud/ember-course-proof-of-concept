import Ember from 'ember';

export default Ember.Controller.extend({
  currentFilter: 'active',
  activeTodos: Ember.computed.filterBy('model', 'isDone', false),
  innactiveTodos: Ember.computed.filterBy('model', 'isDone', true),
  currentTodos: Ember.computed('currentFilter', 'activeTodos', 'innactiveTodos', function() {
    const activeTodos = this.get('activeTodos');
    const innactiveTodos = this.get('innactiveTodos');
    const currentFilter = this.get('currentFilter');

    if (currentFilter === 'active') {
      return activeTodos;
    } else {
      return innactiveTodos;
    }
  }),

  actions: {
    changeFilter(filter) {
      this.set('currentFilter', filter);
    }
  }
});
