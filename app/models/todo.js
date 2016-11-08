import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  isDone: DS.attr('boolean'),
  user: DS.belongsTo('user'),
  isEditing: false
});
