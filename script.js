let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d")
let isclear = false;
//test
/*c.beginPath()
c.fillStyle = "black";
c.arc(105,70,60,0.2,Math.PI*2)
c.fill()

c.fillStyle = "red";
c.font = "25px verdana";
c.fillText("GoatMan",50,75);*/


class Ball {
    constructor(x, y, vx, vy, colorR = 0, colorG = 0, colorB = 0) {
        this.rt = ["GoatMan","GOATMAN","goatman","Goat-Man","Goat_Man","GoAtMaN","gOaTmAn","goatMAN","GOATman"]
        this.rtt = this.rt[random(0,8)]
        this.tf = ["Times New Roman","Arial","Trebuchet MS","Monospaced font","Georgia","Garamond","Verdana","Helvetica","Tahoma"]
        this.rttf = this.tf[random(0,8)];
        this.st = random(10,90);
        //dayere e farzi
        this.r = this.st+10;
        this.x = x || random(0 + this.r, innerWidth - (this.r * 3));
        this.y = y || random(0 + this.r, innerHeight - (this.r * 3));

        //speed

        document.querySelector("#sp").addEventListener("click", e => {
            this.vx *= 1.1;
            this.vy *= 1.1;
        })

        document.querySelector("#ps").addEventListener("click", e => {
            this.vx /= 1.1;
            this.vy /= 1.1;
        })

        this.vx = vx || random(1, 10);
        this.vy = vy || random(1, 10);

        //color
        this.colorR = colorR;
        this.colorG = colorG;
        this.colorB = colorB;

        this.draw()
    }
    draw() {
        //test
        /*c.beginPath()
        c.arc(this.x + 55,this.y - 5,this.r,0.2,Math.PI*2)
        c.fill()*/
        c.fillStyle = `rgb(${this.colorR},${this.colorG},${this.colorB})`
        c.font = `${this.st}px ${this.rttf}`;
        c.fillText(`${this.rtt}`, this.x, this.y);

    }
    update() {
        if ((this.x + (this.r * 3) > innerWidth && this.vx > 0) || (this.x < 0 && this.vx < 0)) {
            this.vx *= -1;
            this.colorR = random(1, 400);
            this.colorG = random(1, 400);
            this.colorB = random(1, 400);
        }
        if (((this.y /*+ this.r*/) > innerHeight && this.vy > 0) || (this.y - this.r + 50 < 0 && this.vy < 0)) {
            this.vy *= -1;
            this.colorR = random(1, 400);
            this.colorG = random(1, 400);
            this.colorB = random(1, 400);
        }
        this.vx += cv;
        this.vy += cv;

        this.x += this.vx
        this.y += this.vy
        this.draw();
    }
    serialize() {
        return {
            x: this.x,
            y: this.y,
            vx: this.vx,
            vy: this.vy,
            colorR: this.colorR,
            colorG: this.colorG,
            colorB: this.colorB,
        }
    }
}
let cv = 0;
let iv = 1;
let balls = [];

let balls_b = localStorage.getItem('balls');
if (balls_b != null) {
    balls = JSON.parse(balls_b).map(({ x, y, vx, vy, colorR, colorG, colorB }) => new Ball(x, y, vx, vy, colorR, colorG, colorB));
}

if(!balls.length) {
    balls.push(new Ball());
}

function animate() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    balls.forEach(e => {
        e.update()
    })
    requestAnimationFrame(animate)

}
animate()

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
window.addEventListener("resize", e => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
document.querySelector("#ad").addEventListener("click", e => {
    balls.push(new Ball());
})
document.querySelector("#rem").addEventListener("click",e=>{
    balls.pop()
})
document.querySelector("#crp").addEventListener("click", e => {
    cv++;
    document.querySelector('#cr').innerHTML = "Crazy: " + cv;
})
document.querySelector("#crn").addEventListener("click", e => {
    cv--;
    document.querySelector('#cr').innerHTML = "Crazy: " + cv;
})
window.addEventListener('beforeunload', () => {
    if(isclear) return;
    localStorage.setItem('balls', JSON.stringify(balls.map(ball => ball.serialize())));
})
document.querySelector("#cl").addEventListener("click",e=>{
    localStorage.removeItem('balls');
    isclear = true;
    window.location.reload();
})
