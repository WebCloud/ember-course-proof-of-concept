import Ember from 'ember';

export default Ember.Controller.extend({
  user: { login: null, password: null },
  actions: {
    login() {
      console.info(this.get('user'));
    }
  }
});
