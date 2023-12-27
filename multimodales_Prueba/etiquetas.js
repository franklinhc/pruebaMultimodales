// clase Jitter
class etiqueta {
    constructor(_x, _y, _dato) {
        this.miX = _x;
        this.miY = _y;
        this.miZ = 0;
        this.dato = _dato;

        this.ancho = 38; // 22
        this.alto = 10; // 8
        this.colorDeTexto = color(0);

        // creación del objeto gráfico
        this.etiqueta = createGraphics(this.ancho,this.alto);
        this.etiqueta.textAlign(LEFT);
        this.etiqueta.textSize(10); // 61
    }

    display () {
        //this.etiqueta.clear();
        this.etiqueta.background(this.colorDeFondo);
        this.etiqueta.fill(this.colorDeTexto);
        this.etiqueta.text(this.dato, 1,9); // 11,6
        this.etiqueta.noStroke();
        push();
        translate (this.miX , this.miY , this.miZ);
        rotateX(0.61); // angulo para dar la cara a la cámara
        texture(this.etiqueta);
        //drawingContext.disable(drawingContext.DEPTH_TEST)
        //drawingContext.enable(drawingContext.BLEND)
        plane(this.ancho, this.alto);
        //drawingContext.enable(drawingContext.DEPTH_TEST)
        pop();
    }

}


class etiquetaVertical {
    constructor(_x, _y, _dato) {
        this.miX = _x;
        this.miY = _y;
        this.miZ = 0;
        this.dato = _dato;

        this.ancho = 16; // 22 y 8
        this.alto = 8;
        this.colorDeFondo = color(255,255,0);
        this.colorDeTexto = color(0);

        this.etiqueta = createGraphics(this.ancho,this.alto);
        this.etiqueta.background(this.colorDeFondo);
        this.etiqueta.fill(this.colorDeTexto);
        this.etiqueta.textAlign(CENTER);
        this.etiqueta.textSize(4);
        this.etiqueta.text(this.dato, 7,5);
        //print("this.miX:" + this.miX+ "  this.miY:" +this.miY+ "  this.miZ =" + this.miZ);
        //print("this.ancho =" + this.ancho + "  this.alto:" +this.alto );
    }

    display () {
        this.etiqueta.background(this.colorDeFondo);
        this.etiqueta.text(this.dato, 11,6);

        noStroke();
        push();
        translate (this.miX , this.miY , this.miZ);
        rotateX(0.61); // angulo para dar la cara a la cámara
        texture(this.etiqueta);
        plane(this.ancho, this.alto);
        pop();
    }

}