import Ember from 'ember';

export default Ember.Controller.extend({
  user: { login: null, password: null },
  authentication: Ember.inject.service(),
  actions: {
    login() {
      const { login: email, password } = this.get('user');
      if (typeof email === 'undefined' || typeof password === 'undefined') {
        return;
      }

      this.get('authentication').login({ email, password })
        .then(()=> {
          this.transitionToRoute('authenticated');
        })
        .catch(console.error);
    }
  }
});
