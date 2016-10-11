import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  confirmPassword: null,
  isValid: Ember.computed('name', 'email', 'password', 'confirmPassword', function() {
    const user = this.getProperties('name', 'email', 'password', 'confirmPassword');
    const isValid = Ember.isPresent(user.name) &&
      Ember.isPresent(user.email) &&
      Ember.isPresent(user.password) &&
      Ember.isPresent(user.confirmPassword) &&
      user.password === user.confirmPassword;

    return isValid;
  })
});
