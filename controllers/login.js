var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/', function(request, response){
	response.render('login/index');
});

router.post('/', function(request, response){

	var sql ="select * from user where username='"+request.body.uname+"' and password='"+request.body.password+"'";
	db.getResults(sql, function(results){
		if(results.length > 0){
			response.cookie('username', request.body.uname);
			response.redirect('/home');
		}else{
			response.send('invalid username/password');		
		}
	});

});

module.exports = router;


