var path = require('path');

//postgres DATABASE_URL = POSTGRES://user:passw@host:port/database
//SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user 	= (url[2]||null);
var pwd 	= (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//cargar modelo ORM
var Sequelize = require('sequelize');

// usar BBDD SQLite
/*var sequelize = new Sequelize(null,null,null,
{
	dialect:"sqlite",
	storage:"quiz.sqlite"
});*/

var sequelize = new Sequelize(DB_name,user,pwd,
{
	dialect	:protocol,
	protocol:protocol,
	port	:port,
	host	:host,
	storage:storage,// solo SQLite (.env)
	omitNull:true//solo Postgres
});

//importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
var Comment = sequelize.import(path.join(__dirname,'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;//expoortar definicion de la tabla Quiz
exports.Comment = Comment;//expoortar definicion de la tabla Comment

//sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function(){
	//success ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count===0){// l tabla se inicializa solo si esta vacia

			Quiz.create({
				pregunta:'Capital de Italia?',
				repuesta:'Roma',
				tema:'Ocio'
			}).then(function(){
				console.log('Primera pregunta inicializada');
			});

			Quiz.create({
				pregunta:'Capital de Portugal?',
				repuesta:'Lisboa',
				tema:'Ocio'
			}).then(function(){
				console.log('Segunda pregunta inicializada');
			});
		}
	});
});