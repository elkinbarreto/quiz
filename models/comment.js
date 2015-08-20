module.exports = function(sequelize, DataTypes){
	return sequelize.define(
		'Comment',{

			texto:{
				type: DataTypes.STRING,
				validate:{notEmpty:{msg:"-> Falta comentario"}}
			},//fin del campo texto


			publicado:{
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
			
		});//fin de sequelize.define
}//fin de exports