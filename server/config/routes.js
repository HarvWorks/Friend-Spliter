var users = require('../controllers/users.js');
var path = require( 'path' );

module.exports = function(app){
	app.get('/users', function(req, res) {  // Get all users
		users.index(req, res);
	});
	app.post('/users', function(req, res) { //new user
		users.create(req, res);
	});
	app.post('/users/login', function(req, res) {  // login
		users.login(req, res);
	});

	app.get('/transactions_owed/:user_id', function(req, res) { //get all transactions that the user needs to pay
		users.transactions_owed(req, res);
	});
	app.get('/transactions_requested/:user_id', function(req, res) { // get all transactions that the the user is requestion
		users.transactions_requested(req, res);
	});
	app.post('/transactions', function(req, res) { // post a new transaction to the server
		users.post_transactions(req, res);
	});
	app.post('/pay_transaction/:id', function(req, res) { // pay a transaction
		users.pay_transaction(req, res);
	});
	app.post('/delete_transaction/:id', function(req, res) { // delete/cancel a transaction
		users.delete_transaction(req, res);
	});

	app.get('/app/*', function(req, res) {
		res.sendFile(path.join(__dirname, '../../client/index.html'));
	});
};
