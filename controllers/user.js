var express = require('express');
var db = require('./../models/db');

var router = express.Router();


router.get('/adduser', function(request, response){
	response.render("user/adduser");
});

router.get('/userList', function(request, response){

		var sql = "select * from user";
		db.getResults(sql, function(results){
			if(request.cookies['username'] != null){
				response.render('user/index', {users: results});		
			}else{
				response.redirect('/logout');
			}
		});	
});

router.get('/edit/:id', function(request, response){

	var sql = "select * from user where id="+request.params.id;
	db.execute(sql, function(status){	
		if(status){
			response.redirect("/user/userList");
		}else{
			response.redirect("/user/edit");	
		}
	})
	
});

router.post('/delete/:id', function(request, response){
	var sql = "delete from user where id="+request.params.id;
	db.execute(sql, function(status){	
		if(status){
			response.redirect("/user/userList");
		}else{
			response.redirect("/user/delete/"+request.params.id);	
		}
	})
});
router.post('/adduser', function(request, response){
	var user = {
		username: request.body.username,
		password: request.body.password,
		ename: request.body.ename,
		econt: request.body.contact
	};
	var sql ="insert into user(id,username,password,empname,empcontact) values('', '"+ user.username+"', '"+user.password+"','"+user.ename+"','"+user.econt+"')";
		
	db.execute(sql, function(status){	
		if(status){
			response.redirect("/user/userList");
		}else{
			response.redirect("/user/delete/"+request.params.id);	
		}
	})
	
});
router.get('/delete/:id', function(request, response){
	var sql = "select * from user where id="+request.params.id;
	db.getResults(sql, function(result){
		response.render("user/delete", {user: result[0]});
	})
});

router.get('/details/:id', function(request, response){

	var sql = "select * from user where id="+request.params.id;
	db.getResults(sql, function(result){
		response.render("user/details", {user: result[0]});
	})

});

module.exports = router;



