var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comandos con :quizId
router.param('quizId',quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizID(\\d+)', quizController.show);
router.get('/quizes/:quizID(\\d+)/answer', quizController.answer);


router.get('/author',function(req, res){
	res.render('author',{title:'Autor'})
});

module.exports = router;
