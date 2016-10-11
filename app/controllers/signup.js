import Ember from 'ember';

export default Ember.Controller.extend({
  authentication: Ember.inject.service(),
  actions: {
    signup() {
      const user = this.get('model');

      if(user.get('isValid')) {
        user.save()
          .then((user) => this.get('authentication').login(user))
          .then(() => {
            this.transitionToRoute('authenticated');
          })
          .catch(console.error);
      }
    }
  }
});
