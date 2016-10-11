import Ember from 'ember';
const { Promise } = Ember.RSVP;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currentUser: null,
  isAuthenticated: Ember.computed.bool('currentUser'),

  init() {
    this.set('currentUser', this._getCurrentUserObject());
    this._refreshSession().then(() => console.log('User session refreshed'));
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

  logout() {
    this.set('currentUser', null);
    sessionStorage.removeItem('currentUser');
  },

  _fetchCurrentUser(user) {
    if (typeof user.id !== 'undefined') {
      this.set('currentUser', user);
      return Promise.resolve(user);
    } else {
      return this.get('store').queryRecord('user', user)
        .then((user) => {
          this.set('currentUser', user);

          return user;
        });
    }
  },

  _saveSession(userInstance) {
    const currentUser = userInstance.getProperties('email', 'name');
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

    return userInstance;
  },

  _getCurrentUserObject() {
    const userSession = sessionStorage.getItem('currentUser');

    if (Ember.isPresent(userSession)) {
      return JSON.parse(userSession);
    } else {
      return null;
    }
  },

  _refreshSession() {
    return new Promise((resolve, reject) => {
      const userObject = this._getCurrentUserObject();

      if (Ember.isPresent(userObject)) {
        this._fetchCurrentUser(userObject)
          .then(resolve)
          .catch(reject);
      } else {
        reject('No user session found');
      }
    });
  }
});
