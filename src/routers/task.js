const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

// Create task
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send()
  }
})

// Find all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.status(500).send()
  }
})

// Find specifik task
router.get('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findById(id)

    if (!task) {
      res.status(404).send()
    }

    res.send(task)
  } catch (error) {
    res.status(500).send()
  }

  // So it will fail for random values
  if (id.length !== 24) {
    res.status(404).send()
  }
})

// Update task
router.patch('/tasks/:id', async (req, res) => {
  // Get the properties from the request
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'priority', 'completed']
  const isValid = updates.every(update => allowedUpdates.includes(update))

  if (!isValid) {
    return res
      .status(400)
      .send({ error: `Invalid options: ${updates.toString()}` })
  }

  try {
    const task = await Task.findById(req.params.id)

    // Update each property
    updates.forEach(update => (task[update] = req.body[update]))

    await task.save()

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(400).send()
    }

    res.send(task)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
