var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

<<<<<<< HEAD
router.get('/author',function(req, res){
	res.render('author',{title:'Autor'})
});
=======
>>>>>>> 404dd282422ccf78f92d52c0ae00788fd643fb55
module.exports = router;
