// clase Jitter
class cubo {
    constructor(x, y, z, sz, img) {
        this.x = x;
        this.y = y;
        this.yO = y;
        this.z = z;
        this.lado = sz;
        this.imagen = img;
        this.arrastrandomeHzIz = false;
        this.arrastrandomeHzDr = false;
        this.arrastrandomeVr = false;
    }


    display() {

        //para manda a pintar las flechas según el tipo de arrastre -----------------
        if (this.arrastrandomeHzIz && pmouseX < mouseX) {
            this.x = cursoX3D - offsetHz;
            //etiquetaIzquierda1.miX = cursoX3D-12;
            //etiquetaIzquierda1.miY = cursoY3D -10;
            //etiquetaIzquierda.dato = cursoX3D -50; // 29.44N
            //etiquetaIzquierda1.dato = "29.44N"; //
            this.moverEtiquetaVerticalAvisible();
            this.flechaIzquierda(largoFlechaAhora);
            this.flechaArriba(largoFlechaAhora);
            this.moverEtiquetaHzIz_a_visible();
            transparencia = 62;
            //print("en arrastrandomeHzIz");
        }

        if (this.arrastrandomeHzDr && pmouseX > mouseX) {
            this.x = cursoX3D - offsetHz;
            this.moverEtiquetaVerticalAvisible();
            this.flechaDerecha(largoFlechaAhora);
            this.flechaArriba(largoFlechaAhora);
            this.moverEtiquetaHzDr_a_visible();
            transparencia = 62;
            //print("arrastrandomeHzDr");
        }

        if (this.arrastrandomeVr && pmouseY >= mouseY) {
            this.y = cursoY3D - offsetVr + this.lado*2;
            this.moverEtiquetaVerticalAvisible();
            transparencia = 62;
            this.flechaArriba(largoFlechaAhora);
            //print("arrastrandomeVr");
        }

        //para pintar el cubo con sus números -----------------
        if (true ){ // esto es para debuging
            fill(255);
            noStroke();

            push();
            specularMaterial(255,transparencia);
            translate (this.x, this.y-this.lado/2, this.z);
            box(this.lado);
            pop();

            let altura=this.lado+1;
            let lado = this.lado/2;
            let zFoto = this.lado/2+1;

            tint(255,transparencia);
            // cara superior
            beginShape();
            texture(this.imagen);
            vertex(this.x-lado, this.y-altura, this.z+lado, 0,1);
            vertex(this.x-lado, this.y-altura, this.z-lado, 0,0);
            vertex(this.x+lado, this.y-altura, this.z-lado, 1,0);
            vertex(this.x+lado, this.y-altura, this.z+lado, 1,1);
            endShape();
            // cara frontal
            beginShape();
            texture(this.imagen);
            vertex(this.x-lado, this.y+lado/11, this.z+zFoto, 0,1);
            vertex(this.x-lado, this.y-lado*2, this.z+zFoto, 0,0);
            vertex(this.x+lado, this.y-lado*2, this.z+zFoto, 1,0);
            vertex(this.x+lado, this.y+lado/11, this.z+zFoto, 1,1);
            endShape();
            tint(255);

        }

    } // fin del display ()


    // EVENTOS ------------------------------------------------------------------------
    // define si el mouse está en alguna de las zonas calientes
    debajo(){
        if (hoverIzquierdo ) {
            this.arrastrandomeHzIz = true;
            cursorAtrapadoHzIz = true;
            offsetHz=cursoX3D-this.x;
        }
        if (hoverDerecho) {
            this.arrastrandomeHzDr = true;
            cursorAtrapadoHzDr = true;
            offsetHz=cursoX3D-this.x;
        }
        if (hoverArriba) {
            this.arrastrandomeVr = true;
            cursorAtrapadoVr = true;
            offsetVr=this.y-cursoY3D;
        }
    }

    // de momento no hace nada :)
    arrastrado(){

        /*
        if (this.arrastrandomeHzIz && pmouseX < mouseX) {
            this.x = cursoX3D - offsetHz;
            //etiquetaIzquierda1.miX = cursoX3D-12;
            //etiquetaIzquierda1.miY = cursoY3D -10;
            //etiquetaIzquierda.dato = cursoX3D -50; // 29.44N
            etiquetaIzquierda1.dato = "29.44N"; //
            this.moverEtiquetaVerticalAvisible();
            this.flechaIzquierda(50);
            transparencia = 62;
            print("en arrastrandomeHzIz");
        }

        if (this.arrastrandomeHzDr && pmouseX > mouseX) {
            this.x = cursoX3D - offsetHz;
            this.moverEtiquetaVerticalAvisible();
            this.flechaDerecha(50);
            transparencia = 62;
            //print("arrastrandomeHzDr");
        }

        if (this.arrastrandomeVr && pmouseY >= mouseY) {
            this.y = cursoY3D - offsetVr + this.lado*2;
            this.moverEtiquetaVerticalAvisible();
            transparencia = 62;
            this.flechaArriba(50);
            //print("arrastrandomeVr");
        }

         */

        //transparencia = 180;
    }

    // cuando se suelta el botón del mouse
    soltado (){
        cursorAtrapadoHzIz = false;
        cursorAtrapadoHzDr = false;
        cursorAtrapadoVr = false;
        this.arrastrandomeHzIz = false;
        this.arrastrandomeHzDr = false;
        this.arrastrandomeVr = false;
        this.y = this.yO; // en caso de haber subido el cubo vuelve al suelo

        // cuando no se está arrastrando las etiquetas salen de la pantalla hacia la derecha
        etiquetaVertical1.miX = 400;
        etiquetaVertical2.miX = 400;
        etiquetaIzquierda1.miX = 400;
        etiquetaIzquierda2.miX = 400;
        etiquetaDerecha1.miX = 400;
        etiquetaDerecha2.miX = 400;
        transparencia = 180;
    }


    // MISCELANEASA A LA CLASE -------------------------------------------------------------

    moverEtiquetaVerticalAvisible(){
        // coordenadas actuales del centro del cubo
        let xA = cuboActivo.x;
        let yA = cuboActivo.y-cuboActivo.lado/2;
        let zA = zPlano;

        // hacia arriba
        etiquetaVertical2.miX = this.x+13;
        etiquetaVertical2.miY = this.y - this.lado/2 - largoDeFlechasVerticales; //
        etiquetaVertical2.miZ = zPlano;

        // hacia abajo
        etiquetaVertical1.miX = xA+13;
        etiquetaVertical1.miY = yA - 5 ; // - this.lado/2 - 5
        etiquetaVertical1.miZ = zA + this.lado/2 + 5;
    }

    moverEtiquetaHzIz_a_visible(){
        // coordenadas actuales del centro del cubo
        let xA = cuboActivo.x;
        let yA = cuboActivo.y-cuboActivo.lado/2;
        let zA = zPlano;

        // empuje
        etiquetaIzquierda1.miX = xA-cuboActivo.lado/2*1.5;
        etiquetaIzquierda1.miY = yA-7;
        etiquetaIzquierda1.miZ = zA;

        // fricción
        etiquetaIzquierda2.miX = xA-cuboActivo.lado/2*1.5;
        etiquetaIzquierda2.miY = yA+cuboActivo.lado/2-10;
        etiquetaIzquierda2.miZ = zA;
    }

    moverEtiquetaHzDr_a_visible(){
        // coordenadas actuales del centro del cubo
        let xA = cuboActivo.x;
        let yA = cuboActivo.y-cuboActivo.lado/2;
        let zA = zPlano;
        // largo de la flecha según cubo
        let lFE = largoDeFlechasDeEmpujeHz;
        let lFF = largoDeFlechasDeFriccionHz;

        // empuje
        etiquetaDerecha1.miX = xA+cuboActivo.lado*0.8;
        etiquetaDerecha1.miY = yA-7;
        etiquetaDerecha1.miZ = zA;

        /*
        push();
        translate(xA+lF, yA-5, zA);
        fill(255,255,100);
        sphere(1);
        pop();
         */

        // fricción
        etiquetaDerecha2.miX = xA+cuboActivo.lado/2+10;
        etiquetaDerecha2.miY = yA+cuboActivo.lado/2-7;
        etiquetaDerecha2.miZ = zA;
    }


    // definiendo si el cursor está en las zonas calientes de los cubos
    overLadosHorizontales (mX, mY, mZ) {
        if ((mX > this.x -this.lado/2 - 10  && mX < this.x-this.lado/2)) {
            hoverIzquierdo= true;
        } else{
            hoverIzquierdo= false;
        }
        if ((mX > this.x + this.lado/2  && mX < this.x + this.lado/2  + 10) &&
            (mY < 0 && mY > -this.lado) ) {
            hoverDerecho= true;
        } else{
            hoverDerecho= false;
        }
    }

    overLadoSuperior (mX, mY, mZ) {
        if ((mX > this.x -this.lado/2  && mX < this.x + this.lado/2)  &&
            (mY < -this.lado  &&  mY > -this.lado - 2) ) {
            hoverArriba= true;
        } else{
            hoverArriba= false;
        }
    }


    // PARA PINTAR LAS FLECHAS ------------------------------------------------------------------------
    flechaIzquierda(largo) {
        fill(128,250,128);
        noStroke();

        // coordenadas actuales del centro del cubo
        let xA = cuboActivo.x;
        let yA = cuboActivo.y-cuboActivo.lado/2;
        let zA = zPlano;
        // largo de la flecha según cubo
        let lFE = largoDeFlechasDeEmpujeHz;
        let lFF = largoDeFlechasDeFriccionHz;

        push();
        translate(xA+cuboActivo.lado/2, yA, zA);
        fill(255,255,100);
        //sphere(7);
        pop();

        // flecha desde el centro (el empuje)
        stroke(128,250,128);
        fill(128,250,128);
        strokeWeight(3);
        line (xA-cuboActivo.lado/2,yA,zA, xA-cuboActivo.lado/2-lFE,yA,zA);
        // para el cono final
        noStroke();
        push();
        translate (xA-cuboActivo.lado/2,yA,zA);
        rotateZ(-PI/2);
        cone(5, 5, 8, 3, true);
        pop();


        // para la flecha de fricción en el suelo
        stroke(128,250,128);
        strokeWeight(3);
        line (xA,yA+cuboActivo.lado/2-3,zA,   xA-lFF,yA+cuboActivo.lado/2-3,zA);
        // para el cono final
        noStroke();
        push();
        translate (xA-lFF,yA+cuboActivo.lado/2-3,zA);
        rotateZ(PI/2);
        cone(5, 5, 8, 3, true);
        pop();
    }

    flechaDerecha (largo) {
        fill(128,250,128);
        noStroke();

        // coordenadas actuales del centro del cubo
        let xA = cuboActivo.x;
        let yA = cuboActivo.y-cuboActivo.lado/2;
        let zA = zPlano;
        // largo de la flecha según cubo
        let lFE = largoDeFlechasDeEmpujeHz;
        let lFF = largoDeFlechasDeFriccionHz;

        // flecha desde el centro (el empuje)
        stroke(128,250,128);
        fill(128,250,128);
        strokeWeight(3);
        line (xA+cuboActivo.lado/2,yA,zA, xA+cuboActivo.lado/2+lFE,yA,zA);
        // para el cono final
        noStroke();
        push();
        translate (xA+cuboActivo.lado/2,yA,zA);
        rotateZ(PI/2);
        cone(5, 5, 8, 3, true);
        pop();

        // para la flecha de fricción en el suelo
        stroke(128,250,128);
        strokeWeight(3);
        line (xA,yA+cuboActivo.lado/2-3,zA,   xA+lFF,yA+cuboActivo.lado/2-3,zA);
        // para el cono final
        noStroke();
        push();
        translate (xA+lFF,yA+cuboActivo.lado/2-3,zA);
        rotateZ(-PI/2);
        cone(5, 5, 8, 3, true);
        pop();
    }

    flechaArriba(largo) {
        //print ("dentro flechaArriba");
        // coordenadas actuales del centro del cubo
        let xA = cuboActivo.x;
        let yA = cuboActivo.y-cuboActivo.lado/2;
        let zA = zPlano;
        // largo de la flecha según cubo
        let lF = largoDeFlechasVerticales;

        // bola roja en el CENTRO
        noStroke();
        push();
        translate (xA,yA,zA);
        fill(255,0,0);
        sphere(3);
        pop();

        // flecha para arriba
        stroke(255,255,0);
        fill(255,255,0);
        strokeWeight(3);
        line (xA,yA,zA, xA,yA-lF,zA);
        // para el cono final
        noStroke();
        push();
        translate (xA,yA-lF,zA);
        rotateZ(PI);
        cone(5, 5, 8, 3, true);
        pop();

        // flecha para abajo
        stroke(255,255,0);
        strokeWeight(3);
        line (xA,yA,zA, xA,yA+lF ,zA);
        // para el cono final
        noStroke();
        push();
        translate (xA,yA+lF,zA);
        cone(5, 5, 8, 3, true);
        pop();
    }
}