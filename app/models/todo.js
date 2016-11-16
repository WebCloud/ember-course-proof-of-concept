import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr(),
  isDone: DS.attr('boolean'),
  user: DS.belongsTo('user'),
  isEditing: false,
  isDoneObserver: Ember.observer('isDone', function() {
    this.save();
  }),
  isInvalid: Ember.computed.empty('title')
});
