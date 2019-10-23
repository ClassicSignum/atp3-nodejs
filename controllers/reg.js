var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/', function(request, response){
	response.render('registration/index');
});



module.exports = router;


