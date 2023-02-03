/*
ph.d. franklin hernandez-castro (skizata.com)
tecnológico de costa rica
escuela de diseño industrial
sketch para el proyecto de investigación de sistemas de aprendizaje multimodal
febrero 2022
*/

function calculeCoodenadasCursor3D(cA) {
    zPlano = 0;
    // calcula la posición del cursosr 3d con respecto al movimiento del mouse
    //  y cambia de cursor 3D a cursor 2D
    switch (cA) {
        case 1:
            if (cA === 1) zPlano = -70;
            cursoX3D = map(mouseX, 0, width, -155, 155);
            cursoY3D = map(mouseY, 0, 270, -120, 0);
            if(cursoY3D>0) cursoY3D=0; // para que no baje del piso

            // para pasar de mouse 2d para los botones a mouse 3d para los cubos
            if (mouseY < 75) cursor();
            else {
                noCursor();
                dibujeCursor3D(numeroDeCuboActivo);
            }
            break;
        case 2:
            if (cA === 2) zPlano = 0;
            cursoX3D = map(mouseX, 0, width, -135, 135);
            cursoY3D = map(mouseY, 0, 350, -125, 0);
            if(cursoY3D>0) cursoY3D=0; // para que no baje del piso

            // para pasar de mouse 2d para los botones a mouse 3d para los cubos
            if (mouseY < 75) cursor();
            else {
                noCursor();
                dibujeCursor3D(numeroDeCuboActivo);
            }
            break;
        case 3:
            if (cA === 3) zPlano = 70;
            cursoX3D = map(mouseX, 0, width, -105, 105);
            cursoY3D = map(mouseY, 0, 475, -135, 0);
            if(cursoY3D>0) cursoY3D=0; // para que no baje del piso

            // para pasar de mouse 2d para los botones a mouse 3d para los cubos
            if (mouseY < 75) cursor();
            else {
                noCursor();
                dibujeCursor3D(numeroDeCuboActivo);
            }
            break;
        default:
    }

    //if(cursoY3D>0) cursoY3D=0; // para que no baje del piso

    //print ("mouseX: " + mouseX + "    mouseY: " + mouseY);
}

function dibujeCursor3D(cA){
    // cambia el color de la bolita/cursor 3D

    if (hoverDerecho || hoverIzquierdo || hoverArriba) fill (0, 255, 0, 175);
    else fill(0, 0, 255);
    noStroke();
    // dibuja la bolita
    push();
    translate (cursoX3D ,cursoY3D ,zPlano);
    //specularMaterial(255,255,0);
    sphere(3);
    pop();
    // dibuja las líneas que salen de la bolita
    stroke(55);
    strokeWeight(0.5);
    line(cursoX3D ,cursoY3D ,zPlano, -150, cursoY3D, zPlano);
    line(cursoX3D ,cursoY3D ,zPlano, 150, cursoY3D, zPlano);
    line(cursoX3D ,cursoY3D ,zPlano, cursoX3D, -150, zPlano);
    line(cursoX3D ,cursoY3D ,zPlano, cursoX3D, 150, zPlano);
    line(cursoX3D ,cursoY3D ,zPlano, cursoX3D, cursoY3D, 150);
    line(cursoX3D ,cursoY3D ,zPlano, cursoX3D, cursoY3D, -150);

    // dibuja la línea del piso en el plano del cubo actual
    stroke(0);
    line(150 ,0 ,zPlano-1, -150, 0, zPlano-1);

    //line(50 ,-350 ,50, 0, 0, 0);
    //print("cursoX3D: " + cursoX3D + "   cursoY3D: " + cursoY3D);
}

function dibujeEjesCoordenados() {
    strokeWeight(0.5);
    // ejes blancos
    let largoDeEjes = 300;
    // eje X rojo
    stroke(255, 0, 0);
    line(0, 0, 0, largoDeEjes, 0, 0);
    stroke(255, 0, 0, 50);
    line(-largoDeEjes, 0, 0, 0, 0, 0);

    // eje Y verde
    stroke(0, 255, 0);
    line(0, 0, 0, 0, largoDeEjes, 0);
    stroke(0, 255, 0, 50);
    line(0, -largoDeEjes, 0, 0, 0, 0);

    // eje Z azul
    stroke(0, 0, 255);
    line(0, 0, 0, 0, 0, largoDeEjes);
    stroke(0, 0, 255, 50);
    line(0, 0, -largoDeEjes, 0, 0, 0);
}

function dibujePiso () {
    //stroke(200,0,0);
    beginShape();
    texture(imagenActual);
    vertex(150, 0, 150, 0,0);
    vertex(150, 0, -150, 0,1);
    vertex(-150, 0, -150, 1,1);
    vertex(-150, 0, 150, 1,0);
    endShape();
}


/*
function pinteEtiqueta (_x,_y,_v) {
    etiquetaDerecha.background(255,255,0);
    etiquetaDerecha.fill(0);
    etiquetaDerecha.textAlign(CENTER);
    etiquetaDerecha.textSize(6);
    etiquetaDerecha.text(_v, 11,6);

    push();
    translate (_x ,_y ,50);
    rotateX(0.61);
    texture(etiquetaDerecha);
    plane(22,8);
    pop();
}
*/

function dibujePlanosDeLosLados(){
    fill(128);
    noStroke();
    // plano atrás
    push();
    translate (0,0,-150);
    plane (300,300);
    pop();

    // plano izquierdo
    push();
    translate (-150,0,0);
    rotateY(HALF_PI);
    plane (300,300);
    pop();

    // plano derecha
    push();
    translate (150,0,0);
    rotateY(HALF_PI);
    plane (300,300);
    pop();
}

// actualiza los valores de las fuerzas en cada caso de cubo y tipo de piso
function actualiceValores (){

    switch (numeroDeTelaActiva) {
        // CASOS PARA PAPEL --------------------------------
        case 1: // piso de papel
            switch (numeroDeCuboActivo) {
                case 1: // cubo 1 (papel)
                    largoDeFlechasVerticales = 12.5;
                    largoDeFlechasDeEmpujeHz = 6.75;
                    largoDeFlechasDeFriccionHz = 3;

                    etiquetaVertical1.dato =  "7.5N";
                    etiquetaVertical2.dato =  "7.5N";
                    etiquetaIzquierda1.dato =  "3.75N";
                    etiquetaDerecha1.dato =  "3.75N";
                    etiquetaIzquierda2.dato =  "1.96N";
                    etiquetaDerecha2.dato =  "1.96N";
                    break;
                default: // cubo 2 o cubo 3 (papel)
                    largoDeFlechasVerticales = 18.75;
                    largoDeFlechasDeEmpujeHz = 9.37;
                    largoDeFlechasDeFriccionHz = 4.68;

                    etiquetaVertical1.dato =  "12.83N";
                    etiquetaVertical2.dato =  "14.83N";
                    etiquetaIzquierda1.dato =  "6.89N";
                    etiquetaDerecha1.dato =  "6.89N";
                    etiquetaDerecha2.dato =  "3.25N";
                    etiquetaIzquierda2.dato =  "3.25N";
                    break;
            }
            break;

        // CASOS PARA TELA --------------------------------
            case 2: // piso de tela
                switch (numeroDeCuboActivo) {
                    case 1: // cubo 1 (tela)
                        largoDeFlechasVerticales = 25;
                        largoDeFlechasDeEmpujeHz = 12.5;
                        largoDeFlechasDeFriccionHz = 6.25;

                        etiquetaVertical1.dato =  "15.5N";
                        etiquetaVertical2.dato =  "15.5N";
                        etiquetaIzquierda1.dato =  "7.5N";
                        etiquetaDerecha1.dato =  "7.7N";
                        etiquetaIzquierda2.dato =  "3.96N";
                        etiquetaDerecha2.dato =  "3.96N";
                        break;
                    default: // cubo 2 o cubo 3 (tela)
                        largoDeFlechasVerticales = 37.5;
                        largoDeFlechasDeEmpujeHz = 18.75;
                        largoDeFlechasDeFriccionHz = 9.375;

                        etiquetaVertical1.dato =  "25.83N";
                        etiquetaVertical2.dato =  "25.83N";
                        etiquetaIzquierda1.dato =  "12.89N";
                        etiquetaDerecha1.dato =  "12.89N";
                        etiquetaDerecha2.dato =  "6.25N";
                        etiquetaIzquierda2.dato =  "6.25N";
                        break;
                }
            break;

        // CASOS PARA LIJA --------------------------------
        default: // piso de lija
            switch (numeroDeCuboActivo) {
                case 1: // cubo 1 (lija)
                    largoDeFlechasVerticales = 50;
                    largoDeFlechasDeEmpujeHz = 25;
                    largoDeFlechasDeFriccionHz = 12.5;

                    etiquetaVertical1.dato =  "30.5N";
                    etiquetaVertical2.dato =  "30.5N";
                    etiquetaIzquierda1.dato =  "15.5N";
                    etiquetaDerecha1.dato =  "15.7N";
                    etiquetaIzquierda2.dato =  "8.96N";
                    etiquetaDerecha2.dato =  "8.96N";
                    break;
                default: // cubo 2 o cubo 3 (lija)
                    largoDeFlechasVerticales = 75;
                    largoDeFlechasDeEmpujeHz = 37.5;
                    largoDeFlechasDeFriccionHz = 18.75;

                    etiquetaVertical1.dato =  "50.83N";
                    etiquetaVertical2.dato =  "50.83N";
                    etiquetaIzquierda1.dato =  "25.89N";
                    etiquetaDerecha1.dato =  "25.89N";
                    etiquetaDerecha2.dato =  "13.25N";
                    etiquetaIzquierda2.dato =  "13.25N";
                    break;
            }
            break;
    }
}