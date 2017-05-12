var noticias = angular.module('moduleNoticias',[]);

noticias.controller('noticiasController', ['$scope',function($scope){
	$scope.noticias = [];

	$scope.agregarNoticia = function(noticia){
		enviarNoticia(noticia);
	}
	$scope.eliminarNoticia = function(id){
		eliminarNoticia(id);
	}
	$scope.cargarNoticias = function(){
		$scope.noticias = cargarNoticias();
	}
}]);


var trivia = angular.module('moduleTrivia', []);

trivia.controller('triviaController', ['$scope', function($scope){
	$scope.preguntas = [];

	$scope.agregarPregunta = function(pregunta, hint, respuesta){
		console.log(pregunta+" "+hint+" "+respuesta);
		enviarPregunta(pregunta, hint, respuesta);
	}
	$scope.eliminarPregunta = function(id){
		$scope.idPreguntaEliminar = '';
		eliminarPregunta(id);
	}
	$scope.cargarPreguntas = function(){
		$scope.preguntas = cargarPreguntas();
	}
}]);

var usuarios = angular.module('moduleUsuario', []);

usuarios.controller('usuariosController', ['$scope', function($scope){
	$scope.usuarios = cargarUsuarios();;

	$scope.cargarUsuarios = function(){
		$scope.usuarios = cargarUsuarios();
	}
}]);

function cargarNoticias(){
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/news";
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          noticias= http.responseText;
          noticias = JSON.parse(noticias);
        }
    }
    http.send(null);
    return noticias;
  };

function cargarPreguntas(){
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/question";
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          preguntas= http.responseText;
          preguntas = JSON.parse(preguntas);
        }
    }
    http.send(null);
    return preguntas;
  };

function cargarUsuarios(){
    //alert("Voy a cargar puntajes");
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/score/week/4";
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          puntajeSemana = http.responseText;
          puntajeSemana = JSON.parse(puntajeSemana);
        }
    }
    http.send(null);
    return(puntajeSemana);
  }

  function enviarPregunta(pregunta,hint,respuesta){
    var params = "pregunta="+pregunta+"&hint="+hint+"&respuesta="+respuesta;
    console.log(params);
    var http = new XMLHttpRequest();
    var url = "https://rpsnode.herokuapp.com/api/question";
    http.open("POST", url, false);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          alert("pregunta enviada correctamente");
        }
    }
    http.send(params);
  }
  function enviarNoticia(noticia){
    var params = "new="+noticia;
    console.log(params);
    var http = new XMLHttpRequest();
    var url = "https://rpsnode.herokuapp.com/api/news";
    http.open("POST", url, false);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          alert("noticia enviada correctamente");
        }
    }
    http.send(params);
  }

  function eliminarNoticia(id){
    var http = new XMLHttpRequest();
    var url = "https://rpsnode.herokuapp.com/api/news/delete/"+id;
    http.open("DELETE", url, false);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          alert("noticia eliminada correctamente");
        }
    }
    http.send(null);
  }
  function eliminarPregunta(id){
    var http = new XMLHttpRequest();
    var url = "https://rpsnode.herokuapp.com/api/question/delete/"+id;
    http.open("DELETE", url, false);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          alert("pregunta eliminada correctamente");
        }
    }
    http.send(null);
  }