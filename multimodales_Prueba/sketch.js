/*
ph.d. franklin hernandez-castro (skizata.com)
tecnológico de costa rica
escuela de diseño industrial
sketch para el proyecto de investigación de sistemas de aprendizaje multimodal
febrero 2022
*/

// declaraciones globales
    let myFont, myFontBold;

    let botonDeInterface, miBotonCubo1, miBotonCubo2, miBotonCubo3;
    let imagenTela, imagenCarton, imagenLija, imagenActual;
    let botonN, botonO, botonP; // imágenes usadas por los botones

    let misRadioBotones = [];
    let botonApretado = 100;

    let cubo1, cubo2, cubo3; // clase cubo
    let imagen1, imagen2, imagen3;
    let numeroDeCuboActivo = 2;
    let numeroDeTelaActiva = 2; // 1-papel 2-tela 3-lija
    let cuboActivo;
    let cursorAtrapadoHzDr, cursorAtrapadoHzIz, cursorAtrapadoVr;
    let hoverDerecho, hoverIzquierdo, hoverArriba;
    let cursoX3D ,cursoY3D ,zPlano;
    let offsetHz = 0, offsetVr = 0;
    let transparencia = 180;

    let largoFlechaAhora = 75;
    let largoDeFlechasVerticales = 20;
    let largoDeFlechasDeEmpujeHz = 10;
    let largoDeFlechasDeFriccionHz = 10;

    let etiquetaVertical1, etiquetaVertical2;
    let etiquetaIzquierda1, etiquetaIzquierda2;
    let etiquetaDerecha1, etiquetaDerecha2;


function preload() {
    myFont = loadFont('data/Roboto-Light.ttf');
    myFontBold = loadFont('data/Roboto-Medium.ttf');
    imagenTela = loadImage("data/tela de yute pq.jpg");
    imagenCarton = loadImage("data/cartulina.jpg");
    imagenLija = loadImage("data/papel de lija.jpg");
    botonN=loadImage("data/miBotonN.png");
    botonO=loadImage("data/miBotonO.png");
    botonP=loadImage("data/miBotonF.png");
    imagen1=loadImage("data/1.jpg");
    imagen2=loadImage("data/2.jpg");
    imagen3=loadImage("data/3.jpg");
}

function setup() {
    createCanvas(700, 700, WEBGL);
    //camera(0,0, (height/2)/tan(PI/6), 0,0,0, 0,1,0); // camera default de frente
    textSize(14);

    // creación del piso
    {imagenActual = imagenTela;
        textureMode(NORMAL);
        textureWrap(CLAMP);
    }

    // creacion de botones
    {
        botonDeInterface = new CheckBoton(-width / 2 + 15, -height / 2 + 15, 10, 10, "interface");
        botonDeInterface.presionado = true;
        miBotonCubo1 = new CheckBoton(-width / 2 + 100, -height / 2 + 15, 10, 10, "cubo 1");
        miBotonCubo2 = new CheckBoton(-width / 2 + 100, -height / 2 + 35, 10, 10, "cubo 2");
        miBotonCubo3 = new CheckBoton(-width / 2 + 100, -height / 2 + 55, 10, 10, "cubo 3");
        miBotonCubo2.presionado = true;

        misRadioBotones[0] = new CheckBoton(-width / 2 + 200, -height / 2 + 15, 10, 10, "papel");
        misRadioBotones[1] = new CheckBoton(-width / 2 + 200, -height / 2 + 35, 10, 10, "tela");
        misRadioBotones[2] = new CheckBoton(-width / 2 + 200, -height / 2 + 55, 10, 10, "lija");
        misRadioBotones[0].presionado = false;
        misRadioBotones[1].presionado = true;
        misRadioBotones[2].presionado = false;
    }

    // creación de los cubos
    {
        cubo1 = new cubo (0,0,-70,50,imagen1);
        cubo2 = new cubo (0,0,0,50,imagen2);
        cubo3 = new cubo (0,0,70,30,imagen3);

        cuboActivo = cubo2;
        cursorAtrapado = false;
    }

    // se crean la etiquetas
    {
    etiquetaVertical1 = new etiqueta(400,-80,"VERT1");
    etiquetaVertical1.colorDeFondo = color(255,255,0);

    etiquetaVertical2 = new etiqueta(400,-10,"VERT2");
    etiquetaVertical2.colorDeFondo = color(255,255,0);

    etiquetaIzquierda1 = new etiqueta(400,-20,"ISQ 1");
    etiquetaIzquierda1.colorDeFondo = color(128,250,128);

    etiquetaIzquierda2 = new etiqueta(400,-20,"ISQ 2");
    etiquetaIzquierda2.colorDeFondo = color(128,250,128);

    etiquetaDerecha1 = new etiqueta(400,-20,"DER 1");
    etiquetaDerecha1.colorDeFondo = color(128,250,128);

    etiquetaDerecha2 = new etiqueta(400,-20,"DER 2");
    etiquetaDerecha2.colorDeFondo = color(128,250,128);
    }
}

function draw() {
    background(0);
    camera(0,-143.394150, 204.788010, // eyeX, eyeY, eyeZ: 0,-143.394150, 204.788010,
        0, 0, 0, // centerX, centerY, centerZ
        0.0, 1, 0.0);  // upX, upY, upZ

    //dibujeEjesCoordenados();

    // definición del largo de la flecha y números en las etiquetas según cada caso
    // para determinar cuáles etiquetas y tamaños de fuerzas están activas

    actualiceValores ();

    // calcula las coordenadas del cursor 3D
    calculeCoodenadasCursor3D(numeroDeCuboActivo);

    // testea si el cursor está en las zonas calientes de los cubos
    switch (numeroDeCuboActivo) {
        case 1:
            miBotonCubo1.presionado = true;
            cubo1.overLadosHorizontales(cursoX3D ,cursoY3D ,zPlano);
            cubo1.overLadoSuperior(cursoX3D ,cursoY3D ,zPlano);
            break;
        case 2:
            miBotonCubo2.presionado = true;
            cubo2.overLadosHorizontales(cursoX3D ,cursoY3D ,zPlano);
            cubo2.overLadoSuperior(cursoX3D ,cursoY3D ,zPlano);
            break;
        case 3:
            miBotonCubo3.presionado = true;
            cubo3.overLadosHorizontales(cursoX3D ,cursoY3D ,zPlano);
            cubo3.overLadoSuperior(cursoX3D ,cursoY3D ,zPlano);
            break;
        default:
    }

    // lights
    {ambientLight(100); // una luz general
        let myX = -50;
        let myY = -200; // negativo para arriba
        let myZ = 150;
        pointLight (255,255,255, myX,myY, myZ);
    }

    // dibuja los cubos según los botones de check
    {
        if (miBotonCubo1.presionado) cubo1.display();
        if (miBotonCubo2.presionado) cubo2.display();
        if (miBotonCubo3.presionado) cubo3.display();
    }

    dibujePiso ();

    // display de las etiquetas que siempre están visibles, pero fuera de la escena
    {
    etiquetaVertical1.display();
    etiquetaVertical2.display();
    etiquetaIzquierda1.display();
    etiquetaIzquierda2.display();
    etiquetaDerecha1.display();
    etiquetaDerecha2.display();
    }

    //dibujePlanosDeLosLados();


    //__________________________________________
    // PLANO 2D PARA ESCRIBIR INSTRUCCIONES EN LA PANTALLA
    {
        camera();
        textFont(myFont);

        fill(64);
        noStroke();
        rect(-width / 2, -height / 2, width, 75);

        fill(255);
        textSize(13);
        text("use teclas 1, 2 o 3 para cambiar de cubo activo", 45, -height / 2 + 45);
        textSize(14);

        // textos para debugging
        /*
        text("cursoX3D: " + round(cursoX3D) + "     cursoY3D: " + round(cursoY3D), 100, -height / 2 + 45);
        text ("mouseX: " + mouseX + "    mouseY: " + mouseY, 100, -height / 2 + 65);

        //text("cubo activo: " + numeroDeCuboActivo, -width / 2 + 10, -height / 2 + 55);
        //text("tela activa: " + numeroDeTelaActiva, -width / 2 + 10, -height / 2 + 75);
        text("mouseX: " + mouseX + "     mouseY: " + mouseY, -width/2+100,-height/2+50); // cursoX3D

        text("miX:" + cuboActivo.x.toFixed(2) + "   miY:" + cuboActivo.y.toFixed(2), 100, -height / 2 + 25);
        text("lado:" + cuboActivo.lado, 100, -height / 2 + 45);
        text("cursoX3D: " + cursoX3D.toFixed(2) + "     cursoY3D: " + cursoY3D.toFixed(2), 100, -height / 2 + 65);
        text("offsetHz: " + offsetHz.toFixed(2) + "     offsetVr: " + offsetVr.toFixed(2), 100, -height / 2 + 85);
        text("lado:" + cuboActivo.lado, 100, -height / 2 + 105);
         */

        botonDeInterface.display();
        if (botonDeInterface.presionado) {
            miBotonCubo1.display();
            miBotonCubo2.display();
            miBotonCubo3.display();

            for (let n = 0; n < misRadioBotones.length; n++) misRadioBotones[n].display();
        }

        // rectángulo de cubo activo
        stroke(255,0,0);
        strokeWeight(1);
        let altoRect = 10;
        switch (numeroDeCuboActivo) {
            case 1:
                altoRect = 10;
                break;
            case 2:
                altoRect = 30;
                break;
            case 3:
                altoRect = 50;
                break;
            default:
        }
        if (botonDeInterface.presionado) rect(-width / 2 + 98, -height / 2 + altoRect, 60, 20);



    }  // FINAL PLANO 2D

}


//__________________EVENTOS________________________
function mousePressed() {
    switch (numeroDeCuboActivo) {
        case 1:
            cubo1.debajo();
            break;
        case 2:
            cubo2.debajo();
            break;
        case 3:
            cubo3.debajo();
            break;
        default:
    }
}

function mouseDragged() {
    //print("en mouseDragged");
    switch (numeroDeCuboActivo) {
        case 1:
            cubo1.arrastrado();
            break;
        case 2:
            cubo2.arrastrado();
            break;
        case 3:
            cubo3.arrastrado();
            break;
        default:
    }
}

function mouseReleased() {
    botonDeInterface.checkMe();
    cubo1.soltado();
    cubo2.soltado();
    cubo3.soltado();

    if (botonDeInterface.presionado){
        miBotonCubo1.checkMe();
        miBotonCubo2.checkMe();
        miBotonCubo3.checkMe();

        // para los botones tipo radioButtons para los materiales del suelo
        botonApretado = 100; // bandera para cuando ninguno está seleccionado
        for (let n=0; n< misRadioBotones.length; n++)
            if (misRadioBotones[n].overEvent()) botonApretado = n;

        if (botonApretado !== 100) {
            for (let n=0; n< misRadioBotones.length; n++) misRadioBotones[n].presionado = false;
            misRadioBotones[botonApretado].presionado = true;

            // para definir la tela del piso
            switch (botonApretado) {
                case 0:
                    imagenActual = imagenCarton; //imagenTela
                    numeroDeTelaActiva = 1; // 1-papel 2-tela 3-lija
                    break;
                case 1:
                    imagenActual = imagenTela; //imagenLija
                    numeroDeTelaActiva = 2; // 1-papel 2-tela 3-lija
                    break;
                case 2:
                    imagenActual = imagenLija; //imagenCarton
                    numeroDeTelaActiva = 3; // 1-papel 2-tela 3-lija
                    break;
                default:
                //
            }
        }
    } // en if
} // end of mouseReleased()

function keyPressed() {
    switch (key) {
        case 'q':
            camera(-8.951568E-60,-143.394150, 204.788010, // eyeX, eyeY, eyeZ
                0, -50, 0, // centerX, centerY, centerZ
                0.0, 1, 0.0);  // upX, upY, upZ
            break;
        case '1':
            numeroDeCuboActivo=1;
            cuboActivo = cubo1;
            break;
        case '2':
            numeroDeCuboActivo=2;
            cuboActivo = cubo2;
            break;
        case '3':
            numeroDeCuboActivo=3;
            cuboActivo = cubo3;
            break;
        default:
        //
    }
}