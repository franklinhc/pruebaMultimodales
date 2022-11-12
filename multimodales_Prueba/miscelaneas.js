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
    switch (cA) {
        case 1:
            if (cA === 1) zPlano = -70;
            cursoX3D = map(mouseX, 0, width, -150, 150);
            cursoY3D = map(mouseY, 0, 380, -165, 0);
            break;
        case 2:
            if (cA === 2) zPlano = 0;
            cursoX3D = map(mouseX, 0, width, -146, 115);
            cursoY3D = map(mouseY, 0, 462, -162, 0);
            break;
        case 3:
            if (cA === 3) zPlano = 70;
            cursoX3D = map(mouseX, 0, width, -83, 87);
            cursoY3D = map(mouseY, 0, 600, -155, 0);
            break;
        default:
    }

    if(cursoY3D>0) cursoY3D=0;
}


function dibujeCursor3D(cA){
    // cambia el color de la bolita/cursor 3D
    if (hoverDerecho || hoverIzquierdo || hoverArriba) stroke(0, 255, 0);
    else stroke(0, 0, 255);

    // dibuja la bolita
    push();
    translate (cursoX3D ,cursoY3D ,zPlano);
    specularMaterial(255,255,0);
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

function fechaDerecha(largo) {
    fill(128,250,128);
    noStroke();
    push();
    translate (cursoX3D+largo/2,cursoY3D,zPlano);
    plane (largo,largo/10);
    triangle(largo/2, -largo/10, largo*0.75, 0, largo/2, largo/10)
    pop();
}

function fechaIzquierda(largo) {
    fill(128,250,128);
    noStroke();
    push();
    translate (cursoX3D-largo/2,cursoY3D,zPlano);
    rotateZ(PI);
    plane (largo,largo/10);
    triangle(largo/2, -largo/10, largo*0.75, 0, largo/2, largo/10)
    pop();
}

function fechaArriba(largo) {
    fill(128,250,128);
    noStroke();
    largo = largo / 1.5;
    push();
    translate (cursoX3D,cursoY3D-largo/2,zPlano);
    rotateZ(-HALF_PI);
    plane (largo,largo/10);
    triangle(largo/2, -largo/10, largo*0.75, 0, largo/2, largo/10)
    pop();
}

function dibujePlanos(){
    fill(128);
    noStroke();
    // plano atrás
    push();
    translate (0,0,-150);
    plane (300,300);
    pop();

    // plano izquierda
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
