import CazaEstelar from "./CazaEstelar.js";

// Comenzamos definiendo la clase hija que extiende de la clase padre (o superclase) CazaEstelar
// Esto quiere decir que los TieFighters heredarán las propiedades y métodos de CazaEstar
class TieFighter extends CazaEstelar {

    // Definimos este método para escoger una acción entre disparar o reparar
    escogerAccion(xWing) {
        // Generamos un número aleatorio para escoger la acción a tomar
        // Utilizamos 0,5 para tener la misma probabilidad de escoger disparar o reparar
        // Teniendo en cuenta que Math.random genera valores aleatorios entre 0 y 1
        const accion = Math.random() < 0.5 ? 'disparar' : 'reparar';
        // Nos devuelve el atributo con el resultado elegido con random
        return accion;
    }

    // Definimos este método para que un TieFighter dispare al XWing
    disparar(xWing) {
        //Con esta condición verificamos si quedan puntos en el escudo del XWing
        if (xWing.escudoActual > 0) {
            // Para calcular el daño al escudo cogemos los puntos que quedan en el escudo
            // Y necesitamos la suma la fuerza de ataque y un número aleatorio entero entre 1 y 10
            const danioEscudo = Math.min(xWing.escudoActual, this.fuerzaAtaque + Math.floor(Math.random() * 10) + 1);
            // Actualizamos la cantidad de puntos que tiene el escudo después del disparo
            xWing.escudoActual -= danioEscudo;
            // Explicamos al usuario lo que acaba de pasar
            const mensajeEscudo = `Te han ocasionado ${danioEscudo} puntos de daño al escudo\n`;
            resultado.value += mensajeEscudo;
        }

        // Con esta condición verificamos si el escudo se ha quedado sin puntos
        if(xWing.escudoActual <= 0) {
            // Si se ha quedado sin puntos llamamos al método disparar() de la clase CazaEstelar
            super.disparar(xWing);
            // Explicamos al usuario lo que acaba de pasar
            resultado.value += `Te han quitado ${this.herido} puntos de vida\n`;
        }
    }

}

export default TieFighter;