  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var video_canvas = document.getElementById("video_canvas");
  var elId;
  var teclado={};
  var disparos = [];
  var disparar = false;
  var espacioSoltado = false;
  var score = 0;
  var interval;
  var fondoJuego;


  //---------------- OBJETO BALA ----------------
  function Bala(x, y) {
    this.x = x;
    this.y = y;
    this.width = 1;
    this.height = 3;
  }

  //---------------- OBJETO NAVE ----------------

  function Nave(){      // Construyo clase
    this.width = 15;
    this.height =  20;
    this.rightButton = false;
    this.leftButton = false;
    this.x = ((c.width-15)/2);
    this.y = ((c.height-23));
    this.dx = 1;
  }

  var nave = new Nave();      // Creo objeto

  //---------------- OBJETO UFO ----------------

// Objetos enemigos grandes
  function UfoBig(x,y,dx,dy){       // Construyo clase
    this.width = 25;
    this.height = 12;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.image = "big";
  }

// Objetos enemigos medianos
  function UfoMed(x,y,dx,dy){       // Construyo clase
    this.width = 25;
    this.height = 16;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.image = "med";
  }


  var ufo_big1 = new UfoBig(50,10,0.8,0.13)      // Creo objetos
  var ufo_big2 = new UfoBig(250,5,-0.9,0.11)
  var ufo_big3 = new UfoBig(100,20,0.8,0.11)
  var ufo_big4 = new UfoBig(200,15,-0.9,0.15)

  var ufo_med1 = new UfoMed(40,12,0.7,0.08);      // Creo objetos
  var ufo_med2 = new UfoMed(270,17,0.9,0.1);
  var ufo_med3 = new UfoMed(130,21,0.8,0.12);
  var ufo_med4 = new UfoMed(90,5,-0.7,0.14);


  var ufos = [];
  ufos.push(ufo_big1);
  ufos.push(ufo_big2);
  ufos.push(ufo_big3);
  ufos.push(ufo_big4);
  ufos.push(ufo_med1);
  ufos.push(ufo_med2);
  ufos.push(ufo_med3);
  ufos.push(ufo_med4);

  var sources = {                    // Imágenes que utilizaremos en el juego
    ufo1 : '../recursos/imagenes/ufo1.png',
    ufo2 : '../recursos/imagenes/ufo2.png',
    raq  : '../recursos/imagenes/nave.png',
  };

  //---------------- OBJETO NAVE ----------------
 var fondoJuego= [ "url('../recursos/gif/triangles.gif')", "url('../recursos/gif/pinchos.gif')" ];
