console.log('Main.js')
import Game from './src/game.js'
import InputHandler from './src/inputHandler.js'

let canv = document.getElementById('gameScreen');
let ctx = canv.getContext("2d");
var WIDTH = 1280
var HEIGHT = 720
var CANVAS_WIDTH = 1280
var CANVAS_HEIGHT = 720

function resizeCanvas(){
    CANVAS_WIDTH = window.innerWidth - 4;
    CANVAS_HEIGHT = window.innerHeight - 4;
    let ratio = 16/9
    if(CANVAS_HEIGHT < CANVAS_WIDTH/ratio)
        CANVAS_WIDTH = CANVAS_HEIGHT*ratio;
    else
        CANVAS_HEIGHT = CANVAS_WIDTH/ratio;
    canv.style.width = '' + CANVAS_WIDTH + 'px';
    canv.style.height = '' + CANVAS_HEIGHT + 'px';
}
resizeCanvas()
window.addEventListener('resize', resizeCanvas)



function run(){
    game.update()
}

function render(){
    game.render(ctx)
    requestAnimationFrame(render)
}

new InputHandler()

const game = new Game(canv);
setInterval(run, 1000/30);
requestAnimationFrame(render)