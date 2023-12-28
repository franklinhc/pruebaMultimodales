function CheckBoton (mX, mY, mAncho, mAlto, miT) {
    this.miX = mX;
    this.miY = mY;
    this.miAncho = mAncho;
    this.miAlto = mAlto;
    this.miTitulo = miT;
    this.presionado = false;

    this.checkMe = function() {
        if (this.overEvent()) this.presionado = !this.presionado;
        return this.presionado;
    } // end checkMe ()


    this.overEvent = function () {
        let arregloCochino = 90;
        return mouseX - width / 2 > this.miX && mouseX - width / 2 < this.miX + this.miAncho &&
            mouseY - height / 2 > this.miY && mouseY - height / 2 < this.miY + this.miAlto;
    } // end overEvent()

    this.display = function () {
        fill(200);
        textAlign(LEFT);
        if (this.presionado) {
            textFont(myFontBold);
            text(this.miTitulo, this.miX + 15, this.miY + 9);
        }else{
            textFont(myFont);
            text(this.miTitulo, this.miX + 15, this.miY + 9);
        }

        noFill();
        stroke('#FCC178');
        if (this.presionado) {
            if (this.overEvent()) image(botonO, this.miX, this.miY, this.miAncho, this.miAlto);
            else image(botonP, this.miX, this.miY, this.miAncho, this.miAlto);
        } else {
            if (this.overEvent()) image(botonO, this.miX, this.miY, this.miAncho, this.miAlto);
            else image(botonN, this.miX, this.miY, this.miAncho, this.miAlto);
        }
    } // end display
}// end claseBoton