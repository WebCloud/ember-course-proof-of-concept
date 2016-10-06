import Ember from 'ember';
const { Promise } = Ember.RSVP;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currentUser: null,
  isAuthenticated: Ember.computed.bool('currentUser'),

  init() {
    this._refreshSession();
  },

  login(user) {
    return new Promise((resolve, reject) => {
      if (Ember.isNone(user)) {
        reject('A user object must be provided');
      } else {
        this._fetchCurrentUser(user)
          .then(this._saveSession)
          .then(resolve)
          .catch(reject);
      }
    });
  },

  _fetchCurrentUser(user) {
    return this.get('store').queryRecord('user', user)
      .then((user) => {
        this.set('currentUser', user);

        return user;
      });
  },

  _saveSession(userInstance) {
    const currentUser = userInstance.getProperties('email', 'name');
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

    return userInstance;
  },

  _refreshSession() {
    return new Promise((resolve, reject) => {
      const userSession = sessionStorage.getItem('currentUser')

      if (Ember.isPresent(userSession)) {
        const userObject = JSON.parse(userSession);
        this._fetchCurrentUser(userObject)
          .then(resolve)
          .catch(reject);
      } else {
        reject('No user session found');
      }
    });
  }
});
