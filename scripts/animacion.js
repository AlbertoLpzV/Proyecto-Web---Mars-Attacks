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
var replay;

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

//----------------------------------- FUNCIONES --------------------------------


//-----------------------------------------------
//---------------- NAVE -------------------------

function animate_nave(){ // Funcion con la que conseguimos el movimiento de nuestra nave y los disparos

  if(teclado[37]){   // Flecha izda_movimiento de la nave
    nave.x -= 6;
    if(nave.x < 0){
      nave.x = 0;
    }
  }
  if(teclado[39]){   // Flecha drch_movimiento de la nave
    var limite = c.width-nave.width;
    nave.x += 6;
    if(nave.x > limite){
      nave.x = limite;
    }
  }
  if(teclado[32]){   // Barra espaciadora_disparos
    if (espacioSoltado){
    disparar = true;
    espacioSoltado = false;
    }
  } else {
    espacioSoltado = true;
  }
}

//-----------------------------------------------
//---------------- UFOs -------------------------

function cargarImagenes(sources, callback) {  // Función para cargar las imágenes que utilizaremos

        var imagenes = {};
        var imagenesCargadas = 0;
        var numimagenes = 0;
        for(var src in sources) {
          numimagenes++;
        }
        for(var src in sources) {
          imagenes[src] = new Image();
          imagenes[src].onload = function() {
            if(++imagenesCargadas >= numimagenes) {
              callback(imagenes);
            }
          };
          imagenes[src].src = sources[src];
        }
}

function animar_ufo(){                            // Función para animar UFOs

    cargarImagenes(sources, function(imagenes){

      ctx.beginPath();
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(imagenes.raq, nave.x, nave.y, nave.width, nave.height);

      for (var i=0; i< ufos.length; i++){
        if (ufos[i].image == "big"){
          ctx.drawImage(imagenes.ufo1, ufos[i].x,ufos[i].y, ufos[i].width, ufos[i].height);
        }
        if (ufos[i].image == "med"){
          ctx.drawImage(imagenes.ufo2, ufos[i].x,ufos[i].y, ufos[i].width, ufos[i].height);
        }
      }
    });

    if(disparar == true){
      pauseLaser();
      playLaser();
      disparos.push(new Bala( (this.nave.x + 7.5), (this.nave.y - 1) ) );
      disparar = false;
    }

    for (var i=0; i<disparos.length; i++){
      ctx.fillStyle="white";
      ctx.fillRect(disparos[i].x, disparos[i].y, disparos[i].width , disparos[i].height);
    }

          ufo_big1.x += ufo_big1.dx;
          ufo_big2.x += ufo_big2.dx;
          ufo_big3.x += ufo_big3.dx;
          ufo_big4.x += ufo_big4.dx;

          ufo_med1.x += ufo_med1.dx;
          ufo_med2.x += ufo_med2.dx;
          ufo_med3.x += ufo_med3.dx;
          ufo_med4.x += ufo_med4.dx;

          ufo_big1.y += ufo_big1.dy;
          ufo_big2.y += ufo_big2.dy;
          ufo_big3.y += ufo_big3.dy;
          ufo_big4.y += ufo_big4.dy;

          ufo_med1.y += ufo_med1.dy;
          ufo_med2.y += ufo_med2.dy;
          ufo_med3.y += ufo_med3.dy;
          ufo_med4.y += ufo_med4.dy;

          elId = requestAnimationFrame(animar_ufo);

}

function rebotes_ufo(){                            // Rebotes UFOs con las paredes

  if(ufo_big1.x + ufo_big1.dx > c.width-ufo_big1.width || ufo_big1.x + ufo_big1.dx < 1) {  // Rebote paredes
    ufo_big1.dx = -ufo_big1.dx;
  }else if(ufo_big2.x + ufo_big2.dx > c.width-ufo_big2.width || ufo_big2.x + ufo_big2.dx < 1) {  // Rebote paredes
    ufo_big2.dx = -ufo_big2.dx;
  }else if(ufo_big3.x + ufo_big3.dx > c.width-ufo_big3.width || ufo_big3.x + ufo_big3.dx < 1) {  // Rebote paredes
    ufo_big3.dx = -ufo_big3.dx;
  }else if(ufo_big4.x + ufo_big4.dx > c.width-ufo_big4.width || ufo_big4.x + ufo_big4.dx < 1) {  // Rebote paredes
    ufo_big4.dx = -ufo_big4.dx;

  }else if(ufo_med1.x + ufo_med1.dx > c.width-ufo_med1.width || ufo_med1.x + ufo_med1.dx < 1) {  // Rebote paredes
    ufo_med1.dx = -ufo_med1.dx;
  }else if(ufo_med2.x + ufo_med2.dx > c.width-ufo_med2.width || ufo_med2.x + ufo_med2.dx < 1) {  // Rebote paredes
    ufo_med2.dx = -ufo_med2.dx;
  }else if(ufo_med3.x + ufo_med3.dx > c.width-ufo_med3.width || ufo_med3.x + ufo_med3.dx < 1) {  // Rebote paredes
    ufo_med3.dx = -ufo_med3.dx;
  }else if(ufo_med4.x + ufo_med4.dx > c.width-ufo_med4.width || ufo_med4.x + ufo_med4.dx < 1) {  // Rebote paredes
    ufo_med4.dx = -ufo_med4.dx;
  }
}

//---------------------------------------------------
//---------------- DISPAROS -------------------------

function moverDisparos(){  //El movimiento de los disparos lo conseguimos con esta funcion.

  for(var i in disparos){
    var disparo = disparos[i];
    disparo.y -= 2;  //Con este valor podriamos modificar la velocidad del disparo

    if(disparo.y < 0) {
        disparos.splice(i, 1);
    }
  }
}


//---------------------------------------------------------
//---------------- DISPAROS - UFOs -------------------------

function compruebo_colision(){
  // Compruebo colision disparos jugador, me recorro el array de ovnis y balas
	for(var i=0;i<ufos.length;i++){
		for(var j=0;j<disparos.length;j++){
      //Si el array no está vacio
			if(!ufos[i]) continue;
      //Aplico condiciones de colision
			if(disparos[j].y <= ufos[i].y + ufos[i].height && disparos[j].y >= ufos[i].y){
				if( (disparos[j].x >= ufos[i].x && disparos[j].x <= ufos[i].x + ufos[i].width) || (disparos[j].x + 2 >= ufos[i].x && disparos[j] + 2 <= ufos[i].x + ufos[i].width) ){
          //Aumento el score a medida que mato los ovnis
        	score++;
          //Elimino los ovnis del array cuando la bala choca
					ufos.splice(i, 1);
					disparos.splice(j, 1);
          //Para mostrar el incremento del score tanto en la pantalla como en el popups
          marcador_pantalla();
			  }
	  	}
	  }
  }
}
//-----------------------------------------------
//----------------- VIDEO INTRO ----------------------

function pauseVideo(){ // con esta funcion introducimos el video de introduccion y el boton con el cual podemos saltarlo.
  var videoIntro = document.getElementById("introVideo");
  videoIntro.pause();
  document.getElementById("marco").style.display="none";
  document.getElementById("botonIntro").style.display="none"; //boton para saltar la introduccion

}

//-----------------------------------------------
//----------------- PLAY MUSIC ----------------------

//Sonidos para diferentes situaciones.

function playMusic(){   //sonido general
  var playMusic = document.getElementById("music8bit");
  playMusic.play();

}
function pauseMusic(){
  var pauseMusic = document.getElementById("music8bit");
  pauseMusic.pause();
}

function playGameOver(){  // sonido para cuando se pierde la partida
  var playGameOver = document.getElementById("gameoversound");
  playGameOver.play();

}

function playLaser(){   //sonido del disparo
  var playLaser = document.getElementById("lasersound");
  playLaser.play();
}

function pauseLaser(){
  var pauseLaser = document.getElementById("lasersound");
  pauseLaser.pause();
}
