const PasswordModel = require('../models/password');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app     = express();
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/all', async (req, res) => {
	const passwords = await PasswordModel.find({});
	try {
		res.send(passwords);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get('/', (req,res) => {
	res.sendFile('index.html', {root:'.'})
});

app.post('/add',async (req, res) => {
	console.log(req.body)
	var obj = {
		password : req.body.new_adding_password
	}
	const password = new PasswordModel(obj)
	try {
		await password.save();
		res.send(password + "succesfully");
	} catch (err) {
		res.status(500).send(err);
	}
})

app.get('/view', async (req, res) => {
	const password = await PasswordModel.find({});
	try {
		res.send(password);
	} catch(err) {
		res.status(500).send(err);
	}
})

app.post('/changePassword', async (req, res) => {
	var current_password = req.body.old;
	var new_password = req.body.new;
	var confirm_new = req.body.confirm_new;
	var query = {password: current_password}

	var obj = {
		password : current_password
	};
	
	var new_obj = {
		password: new_password
	};
	if(new_password == confirm_new) {
		mongoose.set('useFindAndModify', false);

		PasswordModel.findOne(query, function(err, result) {
			if(err) {
				console.log(err);
			}
			if(!result) {
				res.send(false);
			} else {
				PasswordModel.updateOne(query, new_obj, function(err_, res_) {
					if(err_) {console.log(err_);}
					else{ res.send(true);}
				})
			}
		});
	} else {
		console.log('new and confirmed passwords aren;t matching...')
		res.send(false)
	}
})

module.exports = app