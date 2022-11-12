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

    arrastrado(){
        if (this.arrastrandomeHzIz) {
            this.x = cursoX3D - offsetHz;
        }
        if (this.arrastrandomeHzDr) {
            this.x = cursoX3D - offsetHz;
        }
        if (this.arrastrandomeVr) {
            this.y = cursoY3D - offsetVr + this.lado*2;
        }
    }

    soltado (){
        cursorAtrapadoHzIz = false;
        cursorAtrapadoHzDr = false;
        cursorAtrapadoVr = false;
        this.arrastrandomeHzIz = false;
        this.arrastrandomeHzDr = false;
        this.arrastrandomeVr = false;
        this.y = this.yO;
    }



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


    display() {
        fill(255);
        noStroke();
        push();
        specularMaterial(255);
        translate (this.x, this.y-this.lado/2, this.z);
        box(this.lado);
        pop();

        let altura=this.lado+1;
        let lado = this.lado/2;
        let zFoto = this.lado/2+1;

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
    }
}