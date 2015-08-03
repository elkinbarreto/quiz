
var models = require('../models/models.js');

//autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){

	models.Quiz.find(quizId).then(function(quiz){
		if(quiz){
			req.quiz=quiz;
			next();
		}else{
			next(new Error('No existe pregunta con id = '+quizId));
		}
	}).catch(function(error){next(error);});
};

//GET /quizes
exports.index = function(req,res,next){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{quizes:quizes,errors:[]});
	}).catch(function(error){next(error)});
};

//GET /quizes/:id
exports.show = function(req, res){
	
	res.render('quizes/show',{quiz:req.quiz,errors:[]});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){

	var resultado = 'Incorrecto';

	if(req.query.repuesta === req.quiz.repuesta){
			resultado = 'Correcto';
	}
	res.render('quizes/answer',{quiz:req.quiz,repuesta:resultado,errors:[]});
		
};

//GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build(
			//crea un objeto quiz
			{pregunta:"pregunta", repuesta:"repuesta" }
		);
	res.render('quizes/new', {quiz:quiz,errors:[]});
};

//POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	//guarda en BD los campos pregunta y repuesta de quiz
	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new',{quiz:quiz, errors:err.errors});
		}else{
			quiz.save({fields:["pregunta","repuesta"]}).then(function(){
				res.redirect('/quizes');
			});
		}
	});
	
};