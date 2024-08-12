const express = require('express');
const { db } = require('../firebase');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching all tasks');
    const snapshot = await db.collection('tasks').orderBy('order').get();
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Tasks fetched:', tasks.length);
    res.send(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    console.log('Attempting to create task:', req.body);

    const highestOrderTask = await db.collection('tasks')
      .orderBy('order', 'desc')
      .limit(1)
      .get();
    
    let newOrder = 0;
    if (!highestOrderTask.empty) {
      newOrder = highestOrderTask.docs[0].data().order + 1;
    }

    const docRef = await db.collection('tasks').add({
      ...req.body,
      order: newOrder,
      createdAt: new Date()
    });
    const doc = await docRef.get();
    const task = { id: doc.id, ...doc.data() };
    console.log('Task created successfully:', task);
    res.status(201).send(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).send({ error: 'Failed to create task' });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    await db.collection('tasks').doc(req.params.id).update(req.body);
    const doc = await db.collection('tasks').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).send();
    }
    res.send({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await db.collection('tasks').doc(req.params.id).delete();
    res.send({ id: req.params.id });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/reorder', auth, async (req, res) => {
  try {
    const batch = db.batch();
    const newOrder = req.body;

    const tasksSnapshot = await db.collection('tasks').get();
    const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    newOrder.forEach((item, index) => {
      const taskRef = db.collection('tasks').doc(item.id);
      const task = tasks.find(t => t.id === item.id);
      if (task) {
        batch.update(taskRef, { order: index });
      }
    });

    await batch.commit();
    res.send({ message: 'Tasks reordered successfully' });
  } catch (error) {
    console.error('Error reordering tasks:', error);
    res.status(400).send({ error: 'Failed to reorder tasks' });
  }
});

module.exports = router;