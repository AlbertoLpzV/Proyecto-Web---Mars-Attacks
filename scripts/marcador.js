var score;
var gameover;
var nivel=0;
var juegoprevio;

//-----------------------------------------------
//---------------- MARCADOR ---------------------

function marcador_pantalla(){
	s = document.getElementById("marcador");
	s.innerHTML = score;
}


function escribeScore(){ // Con esto se pretende manejar el valor de score para usarlo en la pagina html y mostrarlo.

	if(gameover == 1){
		puntos = document.getElementById("score-pantalla1");
	}else{
		  puntos = document.getElementById("score-pantalla2");
	}
  puntos.innerHTML = score;

}

function escribeNivel(){ // Funcion para mostrar el nivel si perdemos o ganamos.

	if(gameover == 1){
		n = document.getElementById("nivel1");
	}else{
	  n = document.getElementById("nivel2");
	}
  n.innerHTML = nivel;

}

function escribeLastLevel(){  // Funcion para obtener el resultado del juego que se acaba de perder.
	if (juegoprevio = 0){
		lastScore = 0;
  }else{
		lastScore = score;
	}
	mark = document.getElementById("lastOne");
	mark.innerHTML = lastScore;
	juegoprevio = 1;
}
