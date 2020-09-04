var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var video_canvas = document.getElementById("video_canvas");

var elId;
var teclado={};
var disparos = [];
var disparar = false;
var espacioSoltado = false;
var score;
var replay = 0;
var interval;
var fondoJuego;
var nave;
var nivel=1;
var incremento = 1;
var juegoprevio = 0;


//-----------------------------------------------
//---------------- INICIO JUEGO ---------------------

function init(){  //Funcion de inicio del juego

  if (replay == 0) {
    borrarPressStart(); //Llamamos a esta funcion para que al pulsar Press Star , este botón desaparezca y comience la partida.
    document.getElementById("marcadorpadre").style.display="block";
  }
  playMusic();
  interval = setInterval(animarJuego,10);
  animar_ufo();

}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

function animarJuego(){  //Funcion principal del juego donde se encuentran el resto de funciones necesarias para la implementacion del juego.

  if(replay == 0){
     animate_nave();
     rebotes_ufo();
     moverDisparos();
     compruebo_colision();
     marcador_pantalla();
     agregareventoteclado();
     perder();
     ganar();
     escribeNivel();

  }else if(replay == 1){
     randomFondoJuego(fondoJuego);
     replay = 0;
  }

}

  //----------------------------------------------------------------
  //---------------- INICIALIZACIÓN VARIABLES ---------------------

  function inicializar(){

      teclado={};
      disparos = [];
      disparar = false;
      espacioSoltado = false;

      if(gameover==1){     // Si perdemos la partida muestra lo conseguido y resetea los valores para una nueva partida,
        escribeLastLevel();
    		score = 0;
        gameover = 0;
        nivel=1;
    	}

      //A continuacion definimos la dificultad de cada nivel.

      if (nivel<4) {
        incremento = nivel
      }else{
        incremento = nivel*0.8
      }

      nivel_nuevo();

  }
  //----------------------------------------------------------------
  //------------------ FUNCIÓN RANDOM ------------------------------

  function randCoord(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //----------------------------------------------------------------
  //----------------------- NUEVO NIVEL ----------------------------

  function nivel_nuevo(){  // esta funcion establece las condiciones de un nuevo nivel con sus objetos y caracteristicas.

      nave = new Nave();

      ufo_big1 = new UfoBig(randCoord(10, 250),randCoord(3, 20),(0.7 + (nivel/10)),(0.13*incremento))      // Creo objetos
      ufo_big2 = new UfoBig(randCoord(10, 250),randCoord(3, 20),(-0.8 - (nivel/10)),((0.11)*incremento))
      ufo_big3 = new UfoBig(randCoord(10, 250),randCoord(3, 20),(0.7 + (nivel/10)),(0.11*incremento))
      ufo_big4 = new UfoBig(randCoord(10, 250),randCoord(3, 20),(-0.8 - (nivel/10)),(0.15*incremento))

      ufo_med1 = new UfoMed(randCoord(10, 250),randCoord(3, 20),(0.6 + (nivel/10)),(0.08*incremento));      // Creo objetos
      ufo_med2 = new UfoMed(randCoord(10, 250),randCoord(3, 20),(0.8 + (nivel/10)),(0.1*incremento));
      ufo_med3 = new UfoMed(randCoord(10, 250),randCoord(3, 20),(0.7 + (nivel/10)),(0.12*incremento));
      ufo_med4 = new UfoMed(randCoord(10, 250),randCoord(3, 20),(-0.8 - (nivel/10)),((0.14)*incremento));

      ufos = [];
      ufos.push(ufo_big1);
      ufos.push(ufo_big2);
      ufos.push(ufo_big3);
      ufos.push(ufo_big4);
      ufos.push(ufo_med1);
      ufos.push(ufo_med2);
      ufos.push(ufo_med3);
      ufos.push(ufo_med4);

  }

//----------------------------------------------------------------
//---------------- PANTALLA COMENZAR A JUGAR ---------------------

function pantallaJugar(){

  document.getElementById("marcadorpadre").style.display="none";
  var grd = ctx.createRadialGradient(75,50,5,90,60,100);
  grd.addColorStop(0,"transparent");
  grd.addColorStop(1,"black");
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,1000,500);
}

//-----------------------------------------------
//---------------- INICIO JUEGO ---------------------

function borrarPressStart(){  //Borra el boton incial de PRESS START para comenzar a jugar

  var d = document.getElementById("canvascanvas");
  var d_nested = document.getElementById("press_start");
  var throwawayNode = d.removeChild(d_nested);
}


//----------------------------------------------------------------
//------------------------ BORRAR PATH CANVAS --------------------

function borrar(){   // Borra el canvas

  ctx.beginPath();
  ctx.clearRect(0, 0, c.width, c.height);
  if(replay == 0){
    document.getElementById("myCanvas").style.backgroundImage = 'url("../recursos/gif/city.gif")';
    document.getElementById("marcadorpadre").style.display="none";
  }else if(replay == 1){
    document.getElementById("myCanvas").style.backgroundImage = "none";
    document.getElementById("overlaywin").style.display="none";
    document.getElementById("overlay").style.display="none";
  }
  ctx.closePath();
}



//---------------------------------------------------------
//---------------- FONDO CANVAS RANDOM ---------------------



function randomFondoJuego(fondoJuego){  // Establece un fondo aleaorio en el canvas
  var maxNum = 2;
  var minNum = 0;
  var numeroFondo = Math.floor(Math.random() * (maxNum - minNum)) + minNum;
  var imagenFondoJuego = fondoJuego[numeroFondo];
  document.getElementById("myCanvas").style.backgroundImage = imagenFondoJuego;

}


//---------------------------------------------------------
//---------------- JUGAR OTRA VEZ ---------------------
function playAgain(){   // Se resetean los valores correpondientes y se comienza la partida de nuevo.

    replay = 1;
    borrar();
    cancelAnimationFrame(elId);
    clearInterval(interval);
    inicializar();
    interval = setInterval(animarJuego,10);
    animar_ufo();
    document.getElementById("marcadorpadre").style.display="block";
    playMusic();

}
