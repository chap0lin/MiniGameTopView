import Component from './Component.js'
import Sprite from './sprite.js'

export default class Player extends Component{
    constructor(size){
        super()
        this.state={
            rotation: 0,
            walkingSprite: new Sprite('./src/assets/img/walking.png', size, size, 0, 0, 9, 100, 4),
            standingSprite: new Sprite('./src/assets/img/walking.png', size, size, 0, 0, 9, 100, 4),
            still: true
        }
        this.sprite = this.state.walkingSprite
    }
    update(xv, yv, x, y){
        const {rotation, walkingSprite, standingSprite} = this.state
        //const rotate=xv==1&&yv==0?90:xv==1&&yv==1?135:xv==1&&yv==-1?45:xv==-1&&yv==0?270:xv==-1&&yv==1?-135:xv==-1&&yv==-1?-45:xv==0&&yv==1?180:xv==0&&yv==-1?0:rotation
        const rotate=xv==1&&yv==0?3:xv==-1&&yv==0?1:xv==0&&yv==1?2:xv==0&&yv==-1?0:rotation
        const still = xv==0&&yv==0?true:false
        if(still)
            this.sprite = standingSprite
        else
            this.sprite = walkingSprite
        /*else{
            if(!!walkingSprite)walkingSprite.update(630, 350, rotate)
            this.sprite = walkingSprite
        }*/
        if(!!this.sprite)this.sprite.update(x, y, 0, rotate)
        this.setState({rotation:rotate, still})
    }
    render(ctx){
        this.sprite.render(ctx)
    }
}