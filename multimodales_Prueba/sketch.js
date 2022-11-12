/*
ph.d. franklin hernandez-castro (skizata.com)
tecnológico de costa rica
escuela de diseño industrial
sketch para el proyecto de investigación de sistemas de aprendizaje multimodal
febrero 2022
*/


let myFont, myFontBold;
//let cameraMaxRange = 600;

let botonDeInterface, miBotonCubo1, miBotonCubo2, miBotonCubo3;
let imagenTela, imagenCarton, imagenLija, imagenActual;
let botonN, botonO, botonP; // imágenes usadas por los botones

let misRadioBotones = [];
let botonApretado = 100;

let cubo1, cubo2, cubo3; // clase cubo
let imagen1, imagen2, imagen3;
let numeroDeCuboActivo = 2;
let cuboActivo;
let cursorAtrapadoHzDr, cursorAtrapadoHzIz, cursorAtrapadoVr;
let hoverDerecho, hoverIzquierdo, hoverArriba;
let cursoX3D ,cursoY3D ,zPlano;
let offsetHz = 0, offsetVr = 0;

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

    imagenActual = imagenTela;
    textureMode(NORMAL);
    textureWrap(CLAMP);

    botonDeInterface = new CheckBoton (-width/2+15, -height/2+15, 10, 10, "interface");
    botonDeInterface.presionado = true;
    miBotonCubo1 = new CheckBoton (-width/2+15, -height/2+45, 10, 10, "cubo 1");
    miBotonCubo2 = new CheckBoton (-width/2+15, -height/2+65, 10, 10, "cubo 2");
    miBotonCubo3 = new CheckBoton (-width/2+15, -height/2+85, 10, 10, "cubo 3");
    miBotonCubo2.presionado = true;

    misRadioBotones[0]  = new CheckBoton (-width/2+15, -height/2+115, 10, 10, "tela");
    misRadioBotones[1]  = new CheckBoton (-width/2+15, -height/2+135, 10, 10, "lija");
    misRadioBotones[2]  = new CheckBoton (-width/2+15, -height/2+155, 10, 10, "papel");
    misRadioBotones[0].presionado = true;
    misRadioBotones[1].presionado = false;
    misRadioBotones[2].presionado = false;

    cubo1 = new cubo (0,0,-70,50,imagen1);
    cubo2 = new cubo (0,0,0,50,imagen2);
    cubo3 = new cubo (0,0,70,30,imagen3);

    cuboActivo = cubo2;

    cursorAtrapado = false;
}

function draw() {
    background(0);

    camera(-8.951568E-60,-143.394150, 204.788010, // eyeX, eyeY, eyeZ: -8.951568E-60,-143.394150, 204.788010,
        0, 0, 0, // centerX, centerY, centerZ
        0.0, 1, 0.0);  // upX, upY, upZ
    //dibujeEjesCoordenados();

    // para cambiar el color del cursor 3D en caso de que esté en la zona caliente del cubo
    let largoFlecha = 50;
    if (cursorAtrapadoHzDr) {
        if (cuboActivo === 1) fechaDerecha(largoFlecha*0.66);
        else fechaDerecha(largoFlecha);
    }

    if (cursorAtrapadoHzIz ) {
        if (cuboActivo === 1) fechaDerecha(largoFlecha*0.66);
        else fechaIzquierda(largoFlecha);
    }

    if (cursorAtrapadoVr) {
        if (cuboActivo === 1) fechaDerecha(largoFlecha*0.66);
        else fechaArriba(largoFlecha);
    }

    // calcula las coordenadas del cursosr 3D
    calculeCoodenadasCursor3D(numeroDeCuboActivo);

    switch (numeroDeCuboActivo) {
        case 1:
            miBotonCubo1.presionado = true;
            cubo1.overLadosHorizontales(cursoX3D ,cursoY3D ,zPlano);
            cubo1.overLadoSuperior(cursoX3D ,cursoY3D ,zPlano);
            // para pasar de mouse 2d para los botones a mouse 3d para los cubos
            if (cursoX3D < -115 && cursoY3D<-94) cursor();
            else {
                noCursor();
                dibujeCursor3D(numeroDeCuboActivo);
            }
            break;
        case 2:
            miBotonCubo2.presionado = true;
            cubo2.overLadosHorizontales(cursoX3D ,cursoY3D ,zPlano);
            cubo2.overLadoSuperior(cursoX3D ,cursoY3D ,zPlano);
            // para pasar de mouse 2d para los botones a mouse 3d para los cubos
            if (cursoX3D < -83 && cursoY3D<-102) cursor();
            else {
                noCursor();
                dibujeCursor3D(numeroDeCuboActivo);
            }
            break;
        case 3:
            miBotonCubo3.presionado = true;
            cubo3.overLadosHorizontales(cursoX3D ,cursoY3D ,zPlano);
            cubo3.overLadoSuperior(cursoX3D ,cursoY3D ,zPlano);
            // para pasar de mouse 2d para los botones a mouse 3d para los cubos
            if (cursoX3D < -57 && cursoY3D<-112) cursor();
            else {
                noCursor();
                dibujeCursor3D(numeroDeCuboActivo);
            }
            break;
        default:
    }

    // lights
    ambientLight(100); // una luz general
    //ambientMaterial(255
    let myX = -50;
    let myY = -200; // negativo para arriba
    let myZ = 150;
    pointLight (255,255,255, myX,myY, myZ);

    if (miBotonCubo1.presionado) cubo1.display();
    if (miBotonCubo2.presionado) cubo2.display();
    if (miBotonCubo3.presionado) cubo3.display();

    dibujePiso ();
    //dibujePlanos();

    //__________________________________________
    // INICIO DEL PLANO 2D PARA ESCRIBIR INSTRUCCIONES EN LA PANTALLA
    camera ();
    fill(200);
    textFont(myFont);
    //text ("arrow keys to move and z & a to zoom",-width/2+10,-height/2+20);
    text("cubo activo: " + numeroDeCuboActivo, -width/2+100,-height/2+25);
    //text("mouseX: " + mouseX + "     mouseY: " + mouseY, -width/2+100,-height/2+50); // cursoX3D
    //text("cursoX3D: " + cursoX3D + "     cursoY3D: " + cursoY3D, -width/2+100,-height/2+75);

    // textos para debugging
    text("miX:" + cuboActivo.x.toFixed(2) + "   miY:" + cuboActivo.y.toFixed(2), 100, -height/2+25);
    text("lado:" + cuboActivo.lado , 100, -height/2+45);
    text("cursoX3D: " + cursoX3D.toFixed(2) + "     cursoY3D: " + cursoY3D.toFixed(2) , 100, -height/2+65);
    text("offsetHz: " + offsetHz.toFixed(2) + "     offsetVr: " + offsetVr.toFixed(2) , 100, -height/2+85);
    text("lado:" + cuboActivo.lado , 100, -height/2+105);

    botonDeInterface.display();
    if (botonDeInterface.presionado){
        miBotonCubo1.display();
        miBotonCubo2.display();
        miBotonCubo3.display();

        for (let n=0; n< misRadioBotones.length; n++) misRadioBotones[n].display();
    }



}

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

    switch (numeroDeCuboActivo) {
        case 1:
            cubo1.soltado();
            break;
        case 2:
            cubo2.soltado();
            break;
        case 3:
            cubo3.soltado();
            break;
        default:
    }

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

            switch (botonApretado) {
                case 0:
                    imagenActual = imagenTela;
                    break;
                case 1:
                    imagenActual = imagenLija;
                    break;
                case 2:
                    imagenActual = imagenCarton;
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