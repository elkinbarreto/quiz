module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz',
		{
			pregunta:{
				type:DataTypes.STRING,
				validate: {notEmpty:{msg:"-> Falta pregunta"}}
			}, 
			repuesta:{
				type:DataTypes.STRING,
				validate:{notEmpty:{msg:"-> Falta repuesta"}}
			},
			tema:{
				type:DataTypes.STRING,
				validate:{notEmpty:{msg:"-> Falta tema"}}
			}
		});
};