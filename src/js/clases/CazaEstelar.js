// Comenzamos definiendo la clase padre
class CazaEstelar {

    // Definimos el constructor que tomará 3 parámetros para crear los objetos
    constructor(numeroSerie, vidaMax, fuerzaAtaque) {
        // Asignamos el valor del parámetro a la propiedad
        this.numeroSerie = numeroSerie;
        // Iniciamos vidaActual con el valor que asignamos al parámetro de vidaMax
        this.vidaActual = vidaMax;
        // Asignamos el valor del parámetro a la propiedad
        this.vidaMax = vidaMax;
        // Asignamos el valor del parámetro a la propiedad
        this.fuerzaAtaque = fuerzaAtaque;
        // Iniciamos el atributo a 0, se irá incrementando conforme vayan atacando a las naves
        this.herido = 0;
    }

    // Definimos este método que utilizarán las clases hijas durante la ejecución del juego
    disparar(cazaEstelar) {
        // Calculamos el daño de una nave sumando la fuerzaAtaque con un valor aleatorio del 1 al 10.
        this.herido = this.fuerzaAtaque + Math.floor(Math.random()*10) + 1;

        // Reducimos la vidaActual de la nave con el daño que hemos guardado en herido
        cazaEstelar.vidaActual -= this.herido;
    }

    // Definimos este método que utilizarán las clases hijas posteriormente
    reparar() {
        // Nos aseguramos que no superemos la vida máxima establecida
        if(this.vidaActual + 4 <= this.vidaMax) {
            // Si no superamos la vida máxima, aumentamos la vidaActual en 4 puntos
            this.vidaActual = this.vidaActual + 4;
        } else {
            // Si superamos la vida máxima establecemos la vidaActual a la vida máxima establecida
            this.vidaActual = this.vidaMax;
        }
    }
}

export default CazaEstelar;