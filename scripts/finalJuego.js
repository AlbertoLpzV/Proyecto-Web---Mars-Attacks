var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var video_canvas = document.getElementById("video_canvas");
var elId;
var teclado={};
var disparos = [];
var disparar = false;
var espacioSoltado = false;
var score;
var interval;
var nave;
var gameover;
var nivel;
var gameoversound

//------------------------------------------------
//---------------- GAME OVER ---------------------

function perder(){

//Recorro todos los ovnis
	for(var i=0;i<ufos.length;i++){
    //Si la posicion del ovni coincide con la del canvas (o es mayor ya que cada ovni se incrementa de manera distinta y puede que no coincida exactamente nunca) pierdes
      if (ufos[i].y+ufos[i].height >= c.height){
				cancelAnimationFrame(elId);
				clearInterval(interval);
				replay=0;
				borrar();
				gameover = 1;
				escribeScore();
				escribeNivel();
				pauseMusic();
				playGameOver();
        document.getElementById("overlay").style.display="block";

      }
        //Si la posicion del ovni coincide con la de la nave o por debajo
        else if (ufos[i].y+ufos[i].height>= c.height-nave.height){
          //y ademas choco horizontalmente con la nave
            if((ufos[i].x>=nave.x && ufos[i].x<= nave.x + nave.width) || (ufos[i].x+ufos[i].width>= nave.x && ufos[i].x + nave.width && ufos[i].x + ufos[i].width <= nave.x + nave.width)){
            	//Pongo visible el popup
							cancelAnimationFrame(elId);
	            clearInterval(interval);
							replay=0;
							borrar();
            	gameover = 1;
            	escribeScore();
            	escribeNivel();
							pauseMusic();
							playGameOver();
							document.getElementById("overlay").style.display="block";

            }
          }
        }

}

//------------------------------------------------
//---------------- WINNER ---------------------

//Esta funcion pausa la partida cuando eliminamos a todos los enemigos, nos muestra marcador y nos permite pasar al siguiente nivel.
function ganar(){

  if (ufos.length==0){
		cancelAnimationFrame(elId);
		clearInterval(interval);
		replay=0;
		borrar();
		escribeScore();
		nivel+=1;
		escribeNivel();
    document.getElementById("overlaywin").style.display="block";
  }
}
