var User = require('../models/user.js');

function UsersController(){
	this.index = function(req, res) {
		User.get_users(function(status) {
			var index_status = status;
			if(index_status.error) {
				res.json(index_status.err);
			}
			else{
				res.json(index_status.data);
			}
		});
	};

	this.create = function(req, res){
		User.create_user(req.body, function(status) {
			var create_status = status;
			if(create_status.error) {
				res.json(create_status.err);
			}
			else{
				res.json(create_status.data);
			}
		});
	};

	this.login = function(req, res){
		User.login_user(req.body, function(status) {
			var login_status = status;
			if(login_status.error) {
				res.json(login_status.err);
			}
			else{
				res.json(login_status.data);
			}
		});
	};

	this.transactions_owed = function(req, res){
		User.transactions_owed(req.params.user_id, function(status) {
			var transactions_owed_status = status;
			if(transactions_owed_status.error) {
				res.json(transactions_owed_status.err);
			}
			else{
				res.json(transactions_owed_status.data);
			}
		});
	};

	this.transactions_requested = function(req, res){
		User.transactions_requested(req.params.user_id, function(status) {
			var transactions_requested_status = status;
			if(transactions_requested_status.error) {
				res.json(transactions_requested_status.err);
			}
			else{
				res.json(transactions_requested_status.data);
			}
		});
	};


	this.post_transactions = function(req, res){
		var maxCounter = req.body.ower_ids.length - 1;
		var tempAmount = Math.ceil((req.body.amount * 100)/maxCounter)/100;
		var transaction = "";
		for (var i = 0; i <= maxCounter; i++){
			transaction += "(" + req.body.orginal_payer_id + ", " + req.body.ower_ids[i] + ", " + req.body.transaction + ", " + tempAmount + ", " + tempAmount + ", NOW(), NOW())";
			if ( i < maxCounter){
				transaction += ",";
			}
		}
		User.post_transactions(transaction, function(status) {
			var post_transactions_status = status;
			if(post_transactions_status.error) {
				res.json(post_transactions_status.err);
				return;
			}
			else if (counter == maxCounter){
				res.json(post_transactions_status.data);
				return;
			}
		});
	};


	this.pay_transaction = function(req, res){
		User.pay_transaction(req.params.id, req.body, function(status) {
			var pay_transaction_status = status;
			if(pay_transaction_status.error) {
				res.json(pay_transaction_status.err);
				return;
			}
			else{
				res.json(pay_transaction_status.data);
				return;
			}
		});
	};

	this.delete_transaction = function(req, res){
		User.delete_transaction(req.params.id, function(status) {
			var delete_transaction_status = status;
			if(delete_transaction_status.error) {
				res.json(delete_transaction_status.err);
			}
			else{
				res.json(delete_transaction_status.data);
			}
		});
	};

}

module.exports = new UsersController();
