require('dotenv').config();
const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');

const serviceAccount = require('./backend/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const adminUsername = 'add_admin_username';
const adminPassword = 'add_admin_password';

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash(adminPassword, 8);
    
    const userRef = db.collection('users').where('username', '==', adminUsername);
    const snapshot = await userRef.get();
    
    if (!snapshot.empty) {
      console.log('Admin user already exists');
      return;
    }

    await db.collection('users').add({
      username: adminUsername,
      password: hashedPassword
    });
    
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {

    admin.app().delete();
  }
}

createAdminUser();