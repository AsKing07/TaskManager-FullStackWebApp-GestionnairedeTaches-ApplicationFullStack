// Importing required modules
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creating user schema
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Applying unique validator plugin to user schema
userSchema.plugin(uniqueValidator);

// Exporting user model
module.exports = mongoose.model('User', userSchema);