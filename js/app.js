var context = null;
var particleArray = [];
var particleTimer = null;
var maxParticleCount = 300;
var animTimerId;

$(document).ready(function () { initRainCanvas(200); });

function initRainCanvas(interval) {
    context = $(".rainCanvas").get(0).getContext("2d");
    particleTimer = setInterval(addParticle, interval);
    animTimerId = window.requestAnimationFrame(animate);
}

function animate() {
    update();
    paint();
    animTimerId = window.requestAnimationFrame(animate);
}

function addParticle() {
    particleArray[particleArray.length] = new Particle();
    if (particleArray.length == maxParticleCount)
        clearInterval(particleTimer);
}

function Particle() {
    this.x = Math.round(Math.random() * context.canvas.width);
    this.y = -10;
    this.drift = 4;
    this.speed = Math.round(Math.random() / 5) + 15;

    var rand = Math.random();
    this.rainDrop = rand < 0.33 ? $("#raindrop1").get(0) : rand < 0.66 ? $("#raindrop2").get(0) : $("#raindrop3").get(0);
}

function update() {
    for (var i = 0; i < particleArray.length; i++) {
        if (particleArray[i].y < context.canvas.height) {
            particleArray[i].y += particleArray[i].speed;
            if (particleArray[i].y > context.canvas.height)
                particleArray[i].y = -1;

            particleArray[i].x += particleArray[i].drift;
            if (particleArray[i].x > context.canvas.width)
                particleArray[i].x = 0;
        }
    }
}

function paint() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (var i = 0; i < particleArray.length; i++) {
        context.drawImage(particleArray[i].rainDrop, particleArray[i].x, particleArray[i].y);
    }
}