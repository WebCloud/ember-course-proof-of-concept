import Ember from 'ember';
const { Promise } = Ember.RSVP;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currentUser: null,
  isAuthenticated: Ember.computed.bool('currentUser'),

  login(user) {
    return new Promise((resolve, reject) => {
      if (Ember.isNone(user)) {
        reject('A user object must be provided');
      } else {
        this.get('store').queryRecord('user', user)
          .then((user) => {
            this.set('currentUser', user);

            return user;
          })
          .then(this._saveSession)
          .then(resolve)
          .catch(reject);
      }
    });
  },

  _saveSession(userInstance) {
    const currentUser = userInstance.getProperties('email', 'name');
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

    return userInstance;
  }
});
