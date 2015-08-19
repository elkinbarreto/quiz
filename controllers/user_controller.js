var users = {
	admin:{id:1,username:"admin",password:"1234"},
	elkin:{id:2,username:"elkin",password:"4567"}
}

//comprueba si el ususario esta registrado en users
//si autenticacion falla ho  hay errores se ejecuta callback(error)

exports.autenticar = function(login, password, callback){
	if(users[login]){
		if(password===users[login].password){
			callback(null,users[login]);
		}else{
			callback(new Error('Password no valido'));
		}
	}else{
		callback(new Error('No existe usuario'));
	}
};