import Ember from 'ember';

export default Ember.Controller.extend({
  user: { login: null, password: null },
  actions: {
    login() {
      const { login: email, password } = this.get('user');

      this.store.queryRecord('user', { email, password })
        .then(console.info)
        .catch(console.error);
    }
  }
});
