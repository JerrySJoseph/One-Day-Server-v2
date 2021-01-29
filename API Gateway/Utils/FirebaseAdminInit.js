var admin= require('firebase-admin');

// Fetch the service account key JSON file contents
var serviceAccount = require('../service-account.json');


// Initialize the app with a custom auth variable, limiting the server's access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://oneday-5f5bb-default-rtdb.firebaseio.com/",
})

module.exports.FirebaseAdmin=admin;