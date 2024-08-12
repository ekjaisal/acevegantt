/**
 * Copyright © 2024, Jaisal E. K.
 * This source code is licensed under the BSD-3-Clause License
 */

const jwt = require('jsonwebtoken');
const { db } = require('../firebase');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userDoc = await db.collection('users').doc(decoded.id).get();

    if (!userDoc.exists) {
      throw new Error();
    }

    req.user = { id: userDoc.id, ...userDoc.data() };
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        throw new Error('Access denied. Admin privileges required.');
      }
      next();
    });
  } catch (error) {
    res.status(403).send({ error: error.message });
  }
};

module.exports = { auth, adminAuth };