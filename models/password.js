const mongoose = require('mongoose');

const PasswordSchema = new mongoose.Schema({
	password: {
		type: String,
		required: true
	},
});

const Password = mongoose.model('password', PasswordSchema);
module.exports = Password;


