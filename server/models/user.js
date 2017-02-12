var connection = require('../config/db.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var cert = require('../../key');

function UserModel(){
	this.get_users = function(callback) {
		connection.query("SELECT * FROM users", function (err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	};

	this.create_user = function(user, callback) {
		var err = {};
		if(!user.email) {
			err.email = "Email is required";
		}
		else if(!/[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/.test(user.email)) {
			err.email = "Invalid email address";
		}
		connection.query('SELECT id FROM users WHERE email = ?', [user.email], function(error, result) {
			if(result.length > 0) {
				err.email = "Email already exist, please use another one";
			}
			if(!user.password) {
				err.password = "Password is required";
			}
			else if(user.password.length < 6) {
				err.password = "Password needs at least 6 characters";
			}
			if(!user.password_confirm) {
				err.password_confirm = "Please confirm password";
			}
			else if(!err.password && user.password_confirm != user.password) {
				err.password_confirm = "Passwords don't match";
			}
			if(JSON.stringify(err) !== '{}') {
				callback({error: true, errors: err});
				return;
			}
			user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
			var data = [user.first_name, user.last_name, user.email, user.password];
			connection.query("INSERT INTO users SET first_name = ?, last_name = ?, email = ?,  password = ?, created_at = NOW(), updated_at = NOW()", data, function(error, result) {
				if(error){
					callback({error: true, errors: error});
				}
				else {
					callback({error: false, data: result});
				}
			});
		});
	};

	this.login_user =function(user, callback) {
		var err = {};
		if(!user.email) {
			err.email = "Email is required";
		}
		if(!user.password) {
			err.password = "Password is required";
		}
		if(JSON.stringify(err) !== '{}') {
			callback({error: true, errors: err});
			return;
		}
		connection.query("SELECT * FROM users WHERE email = ?", [user.email], function (error, result) {
			if(result.length < 1) {
				err.email = "Email address and password don't match";
			}
			else if(!bcrypt.compareSync(user.password, result[0].password)) {
				err.email = "Email address and password don't match";
			}
			if(JSON.stringify(err) !== '{}') {
				callback({error: true, errors: err});
				return;
			}
			else{
				callback({error: false, data: result});
			}
		});
	};

	this.transactions_owed = function(user_id, callback) {
		var err = {};
		connection.query("SELECT * FROM transactions WHERE ower_id = ?", [user_id], function (error, result) {
			if(err) {
				callback({error: true, errors: err});
				return;
			}
			else{
				callback({error: false, data: result});
			}
		});
	};

	this.transactions_requested = function(user_id, callback) {
		var err = {};
		connection.query("SELECT * FROM transactions WHERE orginal_payer_id = ?", [user_id], function (error, result) {
			if(err) {
				callback({error: true, errors: err});
				return;
			}
			else{
				callback({error: false, data: result});
			}
		});
	};

	this.post_transactions = function(transaction, callback) {
		var err = {};
		connection.query("INSERT INTO transactions (orginal_payer_id, ower_id, transaction, amount, amount_owed, created_at, updated_at) VALUES ?", [transaction], function (error, result) {
			if(err) {
				callback({error: true, errors: err});
				return;
			}
			else{
				callback({error: false, data: result});
			}
		});
	};

	this.pay_transaction = function(id, payment, callback) {
		var err = {};
		connection.query("UPDATE transactions SET amount_owed = ?, updated_at = NOW() WHERE id = ?", [payment, id], function (error, result) {
			if(err) {
				callback({error: true, errors: err});
				return;
			}
			else{
				callback({error: false, data: result});
			}
		});
	};

}

module.exports = new UserModel();
