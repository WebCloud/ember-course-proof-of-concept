import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('authenticated');

  this.route('user', function() {
    this.route('login');
    this.route('signup');
    this.route('update');
  });
  this.route('todo', function() {
    this.route('create');
  });
});

export default Router;
