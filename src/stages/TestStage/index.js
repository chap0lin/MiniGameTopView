import Component from '../../components/Component.js'
import InputHandler from '../../inputHandler.js'
import Tiles from '../../components/tiles.js'
import Player from '../../components/player.js'
//import BlackBox from '../../components/blackBox.js'

const STEP = 5

export default class TestStage extends Component{
    constructor(gameCallback){
        super()
        this.state = {
            positionX: 0,
            map: [],
            tiles: null,
            xv:0,
            yv:0,
            x:120,
            y:120,
            playerSize: 80,
            tileSize: 60,
            gameCallback
        }
        var inputHandler = new InputHandler()
        inputHandler.subscribe('keyDown','TestLevelDown',(key)=>this.moveCamera('down', key))
        inputHandler.subscribe('keyUp','TestLevelUp', (key)=>this.moveCamera('up', key))
        this.load()
    }
    load(){
        const {playerSize, tileSize} = this.state
        const map = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,9,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,0,0],
            [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,0,0],
            [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,0,0],
            [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,0,0],
            [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,0,0],
            [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,0,0],
            [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,0,0],
            [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,0,0],
            [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,0,0],
            [0,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
        var tiles = new Tiles('./src/assets/img/tilemap.png', map, tileSize,tileSize, 6)
        var player = new Player(playerSize)
        //var blackBox = new BlackBox(38*60)
        this.setState({tiles, map, player})
    }
    moveCamera(evt, key){
        var {xv, yv} = this.state
        switch(key){
            case 'ArrowRight':
                xv=evt=='down'?1:0
                break
            case 'ArrowLeft':
                xv=evt=='down'?-1:0
                break
            case 'ArrowUp':
                yv=evt=='down'?-1:0
                break
            case 'ArrowDown':
                yv=evt=='down'?1:0
                break
        }
        this.setState({xv, yv})
    }
    findTile(x, y){
        const {playerSize, tileSize, map} = this.state
        const mazeX = Math.floor((x)/tileSize)
        const mazeY = Math.floor((y)/tileSize)
        const type = map[mazeY][mazeX]
        console.log('Tile:' + `mX:${mazeX}, my:${mazeY} - ${type}`)
        //console.log(type)
        return(
            {mazeX, mazeY, type}
        )
    }
    canPass(tile, direction){
        const upAllowed = [1, 2, 4, 5, 6, 7, 8, 9]
        const downAllowed = [1, 3, 4, 5, 6, 7, 8, 9]
        const leftAllowed = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const rightAllowed = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        function pertence(ac, n){
            return tile==n||ac
        }
        if(direction == 'up'){
            return upAllowed.reduce(pertence,0)
        }else if(direction == 'down'){
            return downAllowed.reduce(pertence,0)
        }else if(direction == 'left'){
            return leftAllowed.reduce(pertence,0)
        }else{
            return rightAllowed.reduce(pertence,0)
        }
    }
    movePlayer(xv, yv){
        var {x, y, playerSize, tileSize, map} = this.state
        const mazeX = x+playerSize/2
        const mazeY = y+playerSize/2
        //console.log(`Tx:${mazeX}, Ty:${mazeY} - 11x(${tileSize*11} , ${(map.length - 11)*tileSize})`)
        if(yv==-1){ //UP
            if(mazeY%tileSize<=playerSize/2){
                console.log('colision')
                if((mazeX%tileSize<=playerSize/4 || mazeX%tileSize>=tileSize-playerSize/4) && (mazeY >= tileSize*11) && (mazeY<= (map.length-11)*tileSize) ){
                    console.log('WallJump1')
                }else{
                    const tile = this.findTile(mazeX, mazeY-tileSize).type
                    if(!this.canPass(tile, 'up')){
                        console.log('NOT PASSSS')
                    }else{
                        y += yv*STEP
                    }
                }
            }else{
                console.log('no colision')
                y += yv*STEP
            }
        }else if(yv==1){
            if(mazeY%tileSize>=tileSize-playerSize/2){
                if((mazeX%tileSize<=playerSize/4 || mazeX%tileSize>=tileSize-playerSize/4) && (mazeY >= tileSize*11) && (mazeY<= (map.length-11)*tileSize)){
                    console.log('WallJump2')
                }else{
                    const tile = this.findTile(mazeX, mazeY+tileSize).type
                    if(!this.canPass(tile, 'down')){
                        console.log('NOT PASSSS')
                    }else{
                        y += yv*STEP
                    }
                }
            }else{
                y += yv*STEP
            }
        }
        if(xv==1){
            if(mazeX%tileSize>=tileSize-playerSize/2){
                if((mazeY%tileSize<=playerSize/4 || mazeY%tileSize>=tileSize-playerSize/4) && (mazeY >= tileSize*11) && (mazeY<= (map.length-11)*tileSize)){
                    console.log('WallJump3')
                }else{
                    const tile = this.findTile(mazeX+tileSize, mazeY).type
                    if(!this.canPass(tile, 'right')){
                        console.log('NOT PASSSS')
                    }else{
                        x += xv*STEP
                    }
                }
            }else{
                x += xv*STEP
            }
        }else if(xv==-1){
            if(mazeX%tileSize<=playerSize/2){
                if((mazeY%tileSize<=playerSize/4 || mazeY%tileSize>=tileSize-playerSize/4) && (mazeY >= tileSize*11 && mazeY<= (map.length-11)*tileSize)){
                    console.log('WallJump4')
                }else{
                    const tile = this.findTile(mazeX-tileSize, mazeY).type
                    if(!this.canPass(tile, 'left')){
                        console.log('NOT PASSSS')
                    }else{
                        x += xv*STEP
                    }
                }
            }else{
                x += xv*STEP
            }
        }
        return([ x, y ])
    }
    movePlayer2(xv, yv){
        var {x, y} = this.state
        //console.log(`Tx:${mazeX}, Ty:${mazeY}`)
        y += yv*(STEP*2)
        x += xv*(STEP*2)
        return([ x, y ])
    }
    update(){
        var {player, tiles, blackBox, x, xv, y, yv} = this.state;
        [x, y] = this.movePlayer(xv, yv)
        console.log(`X:${x}, Y:${y}`)
        if(!!tiles)tiles.update(0, 0)
        //blackBox.update(1, y)
        player.update(xv, yv, x, y)
        this.setState({x, y})
    }
    render(ctx){
        const {tiles, blackBox, player} = this.state
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,1280,720)
        if(!!tiles)tiles.render(ctx)
        //if(!!blackBox)blackBox.render(ctx)
        if(!!player)player.render(ctx)
        // ctx.fillStyle="blue"
        // ctx.fillRect(this.state.positionX,0,10,10)
    }
    unload(){
        
    }
}