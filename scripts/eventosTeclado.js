var teclado={};


// Con esta funcion dejamos definidos los eventos de teclado que usaremos para los disparos y mover nuestra nave.

function agregareventoteclado(){

  agregarEvento(document,"keydown",function(e){
    teclado[e.keyCode]=true;
  });
  agregarEvento(document,"keyup",function(e){
    teclado[e.keyCode]=false;
  });

  function agregarEvento(elemento,nombreEvento,funcion){
    if(elemento.addEventListener){
      elemento.addEventListener(nombreEvento,funcion,false);
    }
    else if(elemento.attachEvent){
      elemento.attachEvent(nombreEvento,funcion);
    }
  }

}

//------------------------------------------------------------------
//----------------- ANIMACIÓN NAVEGADOR SCROLL ----------------------

function funcionScroll() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("navdesarrollo").style.display = "none";
  } else {
    document.getElementById("navdesarrollo").style.display = "block";
  }
}
