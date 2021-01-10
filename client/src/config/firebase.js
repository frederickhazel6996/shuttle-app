var google = require('./google.json');
var firebase = require('firebase');

export default !firebase.apps.length
    ? firebase.initializeApp(google)
    : firebase.app();
