
var models = require('../models/models.js');

//GET /quizes/question
exports.question = function(req, res){
	//res.render('quizes/question',{pregunta:'Capital de Italia'});
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question',{pregunta:quiz[0].pregunta});
	}); 

//GET /quizes/answer
exports.answer = function(req, res){

	models.Quiz.findAll().success(function(quiz){
		if(req.query.repuesta === quiz[0].repuesta){
			res.render('quizes/answer',{repuesta:'Correcto!'});
		}else{
			res.render('quizes/answer',{repuesta:'Incorrecto!'});
		}
	});
	
};