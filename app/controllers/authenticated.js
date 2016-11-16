import Ember from 'ember';

export default Ember.Controller.extend({
  activeTodos: Ember.computed.filterBy('model', 'isDone', false),
  innactiveTodos: Ember.computed.filterBy('model', 'isDone', true),
  allTodos: Ember.computed('activeTodos', 'innactiveTodos', function() {
    const activeTodos = this.get('activeTodos');
    const innactiveTodos = this.get('innactiveTodos');

    return { activeTodos, innactiveTodos };
  })
});
