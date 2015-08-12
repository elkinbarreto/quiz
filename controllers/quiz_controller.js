
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
	if(req.query.search){

		var buscar = req.query.search.replace(" ","%");

		models.Quiz.findAll(
		{
			where:["pregunta like ?","%"+buscar+"%"]

		}).then(function(quizes){

				res.render('quizes/index.ejs',{quizes:quizes,errors:[]});

		}).catch(function(error){next(error)});
	}
	else{

		models.Quiz.findAll().then(function(quizes){

		res.render('quizes/index.ejs',{quizes:quizes,errors:[]});

		}).catch(function(error){next(error)});
	}
	
};

//GET /quizes/:id
exports.show = function(req, res){
	
	res.render('quizes/show',{quiz:req.quiz,errors:[]});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){

	var resultado = 'Incorrecto';
	var msgclass='ion-ios-close-outline';
	

	if(req.query.repuesta === req.quiz.repuesta){
			resultado = 'Correcto';
			msgclass='ion-ios-checkmark-outline';
	}
	res.render('quizes/answer',{quiz:req.quiz,repuesta:resultado,msgclass:msgclass,errors:[]});
		
};

//GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build(
			//crea un objeto quiz
			{pregunta:"", repuesta:"", tema:"Ocio" }
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
			quiz.save({fields:["pregunta","repuesta","tema"]}).then(function(){
				res.redirect('/quizes');
			});
		}
	});
	
};

//GET quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz;//autoload de instacia de quiz
	res.render('quizes/edit', {quiz:quiz, errors:[]});
};

//PUT /quizes/:id
exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.repuesta = req.body.quiz.repuesta;
	req.quiz.tema = req.body.quiz.tema;

	req.quiz
	.validate()
	.then(function(err){
		if(err){
			res.render('quizes/edit',{quiz:req.quiz, errors:err.errors});
		}else{
			req.quiz
			.save({fields:["pregunta","repuesta","tema"]})
			.then(function(){
				res.redirect('/quizes');
			});
		}
	});
};

//DELETE /quizes/:id
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};