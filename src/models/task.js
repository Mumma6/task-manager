const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: String,
    default: false,
  },
  date: {
    type: Date,
  },
  priority: {
    type: Number,
  },
})

module.exports = Task