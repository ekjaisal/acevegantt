/**
 * Copyright © 2024, Jaisal E. K.
 * This source code is licensed under the BSD-3-Clause License
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };