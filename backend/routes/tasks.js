/**
 * Copyright © 2024, Jaisal E. K.
 * This source code is licensed under the BSD-3-Clause License
 */

const express = require('express');
const { db } = require('../firebase');
const { auth } = require('../middleware/auth');

const router = express.Router();

function validateTask(task) {
    if (!task.name || typeof task.name !== 'string' || task.name.trim() === '') {
        return 'Task name is required';
    }
    if (!task.start || !isValidDate(task.start)) {
        return 'Valid start date is required';
    }
    if (!task.end || !isValidDate(task.end)) {
        return 'Valid end date is required';
    }
    return null;
}

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

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

        const validationError = validateTask(req.body);
        if (validationError) {
            return res.status(400).send({ error: validationError });
        }

        const tasksSnapshot = await db.collection('tasks').orderBy('order', 'desc').get();
        const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const batch = db.batch();
        tasks.forEach(task => {
            const taskRef = db.collection('tasks').doc(task.id);
            batch.update(taskRef, { order: task.order + 1 });
        });

        const newTaskRef = db.collection('tasks').doc();
        batch.set(newTaskRef, {
            ...req.body,
            order: 0,
            createdAt: new Date()
        });

        await batch.commit();

        const newTaskDoc = await newTaskRef.get();
        const newTask = { id: newTaskDoc.id, ...newTaskDoc.data() };
        console.log('Task created successfully:', newTask);
        res.status(201).send(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(400).send({ error: 'Failed to create task' });
    }
});

router.patch('/:id', auth, async (req, res) => {
    try {
        const validationError = validateTask(req.body);
        if (validationError) {
            return res.status(400).send({ error: validationError });
        }

        await db.collection('tasks').doc(req.params.id).update(req.body);
        const doc = await db.collection('tasks').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).send({ error: 'Task not found' });
        }
        res.send({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(400).send({ error: 'Failed to update task' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await db.collection('tasks').doc(req.params.id).delete();
        res.send({ id: req.params.id });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send({ error: 'Failed to delete task' });
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

router.post('/import', auth, async (req, res) => {
    try {
        const tasks = req.body;
        const batch = db.batch();

        const highestOrderTask = await db.collection('tasks')
            .orderBy('order', 'desc')
            .limit(1)
            .get();
        
        let currentOrder = highestOrderTask.empty ? 0 : highestOrderTask.docs[0].data().order + 1;

        for (const task of tasks) {
            const validationError = validateTask(task);
            if (validationError) {
                return res.status(400).send({ error: `Invalid task: ${validationError}` });
            }

            const newTaskRef = db.collection('tasks').doc();
            batch.set(newTaskRef, {
                name: task.name,
                start: task.start,
                end: task.end,
                progress: parseInt(task.progress) || 0,
                faculty: task.faculty || '',
                ta: task.ta || '',
                comments: task.comments || '',
                order: currentOrder++,
                createdAt: new Date()
            });
        }

        await batch.commit();
        res.status(201).send({ message: 'Tasks imported successfully' });
    } catch (error) {
        console.error('Error importing tasks:', error);
        res.status(400).send({ error: 'Failed to import tasks' });
    }
});

module.exports = router;