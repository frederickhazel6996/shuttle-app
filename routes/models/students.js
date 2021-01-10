var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Database Schema
var studentSchema = new Schema({
    username: String,
    password: String,
    student_id: Number,
    hall: String,
    id: String,
    date_created: String
});

//User Schema
var students = mongoose.model('students', studentSchema);

module.exports = students;
