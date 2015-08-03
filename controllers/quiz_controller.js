
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
		res.render('quizes/index.ejs',{quizes:quizes});
	});
};

//GET /quizes/:id
exports.show = function(req, res){
	//res.render('quizes/question',{pregunta:'Capital de Italia'});
	//models.Quiz.find(req.params.quizID).then(function(quiz){
		//res.render('quizes/show',{quiz:quiz});
	//}); 
	res.render('quizes/show',{quiz:req.quiz});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){

	/*models.Quiz.find(req.params.quizID).then(function(quiz){
		if(req.query.repuesta === quiz.repuesta){
			res.render('quizes/answer',{quiz:quiz, repuesta:'Correcto!'});
		}else{
			res.render('quizes/answer',{quiz:quiz,repuesta:'Incorrecto!'});
		}
	});*/
	var resultado = 'Incorrecto';

	if(req.query.repuesta === req.quiz.repuesta){
			resultado = 'Correcto';
	}
	res.render('quizes/answer',{quiz:req.quiz,repuesta:resultado});
		
};

//GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build(
			//crea un objeto quiz
			{pregunta:"pregunta", repuesta:"repuesta" }
		);
	res.render('quizes/new', {quiz:quiz});
};

//POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	//guarda en BD los campos pregunta y repuesta de quiz
	quiz.save({fields:["pregunta","repuesta"]}).then(function(){
		res.redirect('/quizes');
	});
};