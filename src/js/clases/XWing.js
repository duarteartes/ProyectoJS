import CazaEstelar from "./CazaEstelar.js";

// Comenzamos definiendo la clase hija que extiende de la clase padre (o superclase) CazaEstelar
// Esto quiere decir que los XWing heredarán las propiedades y métodos de CazaEstar
class XWing extends CazaEstelar {
    // Definimos el constructor que tomará 2 parámetros para crear los objetos
    constructor(numeroSerie, r2d2Incorporado) {
        // Llamamos al constructor de la clase padre e inicializamos sus propiedades heredadas
        super(numeroSerie, 20, 4);
        // Asignamos el valor del parámetro a la propiedad
        this.r2d2Incorporado = r2d2Incorporado;
        // Asignamos el valor especificado de 10 a la propiedad
        this.escudoMaximo = 10;
        // Asignamos el valor especificado de 10 a la propiedad
        this.escudoActual = 10;
    }

    // Definimos este método para reparar la nave
    reparar(){
        // Verificamos si el objeto tiene R2D2
        if(this.r2d2Incorporado) {
            // Si lo tiene, reestablecemos la vida al valor de vidaMax
            this.vidaActual = this.vidaMax;
            // También reestablecemos el escudo al valor de escudoMax
            this.escudoActual = this.escudoMaximo;
        } else {
            // Si no tiene R2D2 llamamos al método reparar de la clase padre CazaEstelar
            super.reparar();
        }
    }
}

export default XWing;