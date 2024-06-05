import XWing from "./clases/XWing.js";
import TieFighter from "./clases/TieFighter.js";

// Comenzamos declarando las variables
// Almacenamos el objeto XWing
let xWing;
// En este array almacenamos los TieFighters
let tieFighters = [];
// Utilizamos este boolean para saber si hemos comenzado la partida o no
    // let inicioPartida = false;
// Utilizamos este boolean para gestionar los turnos en la partida
let playerTurn = true; // Variable para rastrear de quién es el turno.

const configuracion = document.getElementById('configuracion');
const acciones = document.getElementById('acciones');
const iniciarPartidaButton = document.getElementById('iniciarJuego');
const dispararButton = document.getElementById('disparar');
const repararButton = document.getElementById('reparar');

// Utilizamos esta variable para mostrar en el textarea de resultado la información del juego
const resultado = document.getElementById('resultado');

//Creamos los eventos para gestionar los botones en nuestro HTML
// Cuando clicamos al botón "Iniciar una nueva partida" ejecutamos la función iniciarPartida
iniciarPartidaButton.addEventListener('click', iniciarPartida);
// Cuando clicamos al botón "Disparar" ejecutamos la función disparar
dispararButton.addEventListener('click', disparar);
// Cuando clicamos al botón "Reparar" ejecutamos la función reparar
repararButton.addEventListener('click', repararXwing);

// Establecemos en none la visulización de estos elementos HTML para ocultarlos
acciones.style.display = 'none';
resultado.style.display = 'none';

// Comenzamos definiendo la función que llamaremos cuando cliquemos en el botón "Iniciar una nueva partida"
function iniciarPartida() {
    // Almacenamos en una variable la información del HTML
    const numeroSerieXwing = document.getElementById('numeroSerieXwing');
    // Guardamos en una variable el elemento HTML
    const r2d2 = document.getElementById('r2d2');
    // Guardamos el valor del elemento según lo que escoja el usuario
    const r2d2Incorporado = r2d2.checked;

    // Creamos la nave XWing mediante el constructor de la clase
    xWing = new XWing(numeroSerieXwing, r2d2Incorporado);
    // Creamos el array TieFighters con 5 naves enemigas, utilizamos un bucle para ello
    // Estas naves tienen los números de serie incrementados del 1 al 5
    for (let i = 0; i < 5; i++) {
        // Creamos una nave y utilizamos push para guardarlo en el array
        tieFighters.push(new TieFighter(i + 1, 10, 2));
    }

    // Actualizamos la variable a true para indicar que hemos comenzado una partida
    iniciarPartida = true;
    // Ocultamos el elemento HTML de configuración para no poder iniciar una nueva partida hasta acabar la actual
    configuracion.style.display = 'none';
    // Mostramos los siguientes elementos HTML con los que se desarrollará la partida
    acciones.style.display = 'block';
    resultado.style.display = 'block';
    // Mostramos una serie de mensajes de inicio para dar la bienvenida al jugador
    resultado.value = 'Bienvenido compañero. Que la fuerza te acompañe \n';
    resultado.value += 'Comienza la Batalla Final \n';
    resultado.value +='..............................\n';
    resultado.value +=' \n';
}

// Continuamos definiendo la función que llamaremos cuando cliquemos en el botón "Disparar"
function disparar() {
    // Si la partida no se ha iniciado termina la ejecución de la función y no se realiza ninguna acción más
    if (!iniciarPartida) return;

    // Comprobamos si es el turno del usuario (jugador)
    if (playerTurn) {
        // Comprobamos si quedan naves enemigas en el array
        if (tieFighters.length > 0) {
            // Cogemos la primera nave que hay en el array
            const tieFighter = tieFighters[0];
            // Llamamos al método disparar de la clase XWing tomando como objetivo al enemigo (TieFighter)
            xWing.disparar(tieFighter);
            // Creamos varios mensajes para describir lo que acaba de ocurrir en la partida
            const mensaje1 = `Has disparado al Tie Fighter Nº${tieFighter.numeroSerie}\n`;
            const mensaje2 = `Le has quitado ${xWing.herido} puntos de vida al enemigo\n`;
            const mensaje3 = `Le queda ${tieFighter.vidaActual} puntos de vida\n`;
            // Mostramos en el HTML la información creada anteriormente
            resultado.value += mensaje1 + mensaje2 + mensaje3;
            resultado.value += ' \n';

            // Comprobamos que la vida del enemigo haya llegado a 0 o menos puntos
            if (tieFighter.vidaActual <= 0) {
                // Eliminamos la nave enemiga del array
                tieFighters.shift();
                // Mostramos un mensaje de información al usuario en el HTML sobre lo que acaba de ocurrir
                resultado.value += `Has destruido al Tie Fighter Nº${tieFighter.numeroSerie}\n`;
                resultado.value += ' \n';

                // Comprobamos que no quede ningún TieFighter en el array
                if (tieFighters.length === 0) {
                    // Si es así llamamos a la función finPartida para terminar la partida
                    finPartida(true);
                }
            }

            // Cambiamos el turno del jugador a false para que la máquina pueda actuar
            playerTurn = false; // Cambiar el turno a la máquina.
        }
    }

    // Llamamos a la función que tenemos
    escogerAccion();
}

/*
function escogerAccion() {
    if (!iniciarPartida) return;

    if (!playerTurn && tieFighters.length > 0) {
        const tieFighter = tieFighters[0]; // Tomar el primer Tie Fighter en la lista.
        const accion = Math.random() < 0.5 ? 'disparar' : 'reparar';

        if (accion === 'disparar') {
            tieFighter.disparar(xWing);
            const mensaje1 = `Te ha disparado el TieFigther Nº${tieFighter.numeroSerie}\n`;
            const mensaje2 = `Vida: ${xWing.vidaActual} Escudo: ${xWing.escudoActual}\n`;
            resultado.value += mensaje1 + mensaje2;
            resultado.value += ' \n';

            if (xWing.vidaActual <= 0) {
                finPartida(false);
            }
        } else {
            tieFighter.reparar();
            resultado.value += `El TieFighter Nº${tieFighter.numeroSerie} ha reparado. Le queda ${tieFighter.vidaActual} puntos de vida\n`;
            resultado.value += ' \n';
        }

        playerTurn = true; // Cambiar el turno al jugador después de que la máquina actúe.
    }
}
*/

// Continuamos definiendo la función que se llamará en los turnos del enemigo
function escogerAccion() {
    // Si la partida no se ha iniciado termina la ejecución de la función y no se realiza ninguna acción más
    if (!iniciarPartida) return;

    // Comprobamos que no sea el turno del jugador y que todavía queden naves enemigas en el array
    if (!playerTurn && tieFighters.length > 0) {
        // Cogemos la primera nave que tenemos almacenada en el array
        const tieFighter = tieFighters[0];
        // Llamamos al método escogerAccion de la clase TieFighter y lo almacenamos en una variable
        const accion = tieFighter.escogerAccion(xWing);

        // Si la acción elegida aleatoriamente es disparar se ejecutará el siguiente código
        if (accion === 'disparar') {
            // Llamamos al método disparar de la clase TieFighter tomando como objetivo la nave XWing
            tieFighter.disparar(xWing);
            // Creamos varios mensajes para describir lo que acaba de ocurrir en la partida
            const mensaje1 = `Te ha disparado el TieFigther Nº${tieFighter.numeroSerie}\n`;
            const mensaje2 = `Vida: ${xWing.vidaActual} Escudo: ${xWing.escudoActual}\n`;
            // Mostramos en el HTML la información creada anteriormente
            resultado.value += mensaje1 + mensaje2;
            resultado.value += ' \n';

            // Comprobamos que le queden vida al XWing
            if (xWing.vidaActual <= 0) {
                // Si no le quedan vidas llamamos al método finPartida para decir que el jugador ha perdido
                finPartida(false);
            }
        } else {
            // Si la acción no es disparar se llama al método reparar de la clase padre CazaEstelar que extiende a la clase TieFighter
            tieFighter.reparar();
            // Mostramos en el HTML la información de lo que está sucediendo o cómo se va desarrollando el juego
            resultado.value += `El TieFighter Nº${tieFighter.numeroSerie} ha reparado. Le queda ${tieFighter.vidaActual} puntos de vida\n`;
            resultado.value += ' \n';
        }

        // Cambiamos el valor de la variable para pasarle el turno al jugador
        playerTurn = true;
    }
}

// Seguimos definiendo la función que se llamará cuando cliquemos el botón "Reparar"
function repararXwing() {
    // Si la partida no se ha iniciado termina la ejecución de la función y no se realiza ninguna acción más
    if(!iniciarPartida) return;

    //console.log('Reparar XWing');

    // Llamamos al método reparar de la clase XWing
    xWing.reparar();
    // Mostramos en el HTML la información de lo que está o acaba de suceder
    resultado.value += 'Has arreglado tu XWing\n';
    resultado.value += `Tienes ${xWing.vidaActual} puntos de vida, y ${xWing.escudoActual} puntos de escudo\n`;
    resultado.value += ' \n';

    // Cambiamos el valor de la variable a false para cambiar el turno
    playerTurn = false;
    // Llamamos a escogerAccion de la clase TieFighter para que el enemigo pueda hacer su próximo movimiento
    escogerAccion();
}

// Para terminar definimos la función con la que se terminará el juego que toma como parámetro un boleano
function finPartida (jugadorGana) {
    // Establecemos en false inciarPartida para decir que la partida ha terminado
    iniciarPartida = false;
    // Cambiamos el estilo de los botones donde el jugador selecciona la acción
    // Los cambiamos a none para ocultar los botones si la partida ha terminado
    acciones.style.display = 'none';
    // Declaramos una variable para almecenar un mensaje de fin de partida
    // Si jugadorGana es true se mostrará el primer mensaje, y si es false se mostrará el segundo mensaje en el HTML
    const mensajeFinal = jugadorGana ? 'Has ganado la batalla ¡Viva La República!' : 'Has perdido. El Imperio ha ganado la batalla';
    resultado.value += `${mensajeFinal}\n`;
}