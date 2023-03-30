const admin = require('firebase-admin');
const fs = require('fs')

const serviceAccount = require('./keyDBFirebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = {db}