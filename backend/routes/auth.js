const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../firebase');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const userRef = db.collection('users').where('username', '==', req.body.username);
    const snapshot = await userRef.get();
    if (snapshot.empty) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const user = snapshot.docs[0].data();
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ id: snapshot.docs[0].id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    await db.collection('users').add({
      username: req.body.username,
      password: hashedPassword
    });
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users', auth, async (req, res) => {
    try {
        const users = await db.collection('users').get();
        res.json(users.docs.map(doc => ({ id: doc.id, username: doc.data().username })));
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/users/:id', auth, async (req, res) => {
    try {
        await db.collection('users').doc(req.params.id).delete();
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/users/:id', auth, async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        await db.collection('users').doc(req.params.id).update({ password: hashedPassword });
        res.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;