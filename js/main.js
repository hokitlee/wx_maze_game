import {Maze} from './Maze.js'

require('../libs/weapp-adapter')
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export function Main() {
    let ctx = canvas.getContext('2d')
    let countX = 101;
    let countY = 101;
    let remainX = 50
    let remainY = 50
    let maze = new Maze(countX, countY)
    let map = maze.create()
    let mw = (screenWidth - remainX) / countX;
    mw = Math.floor(mw)
    let mh = (screenHeight - remainY) / countY
    mh = Math.floor(mh)

    remainX = (screenWidth - mw * countX) / 2;
    remainY = (screenHeight - mh * countY) / 2;
    
    console.log(mw, mh)
    for (let i = 0; i < countX; i++) {
        for (let j = 0; j < countY; j++) {
            if (map[i][j] == 0) {
                ctx.fillStyle = '#ff597b';
                ctx.fillRect(remainX + j * mw, remainY + i * mh, mw, mh)
            }
            else {
                ctx.fillStyle = '#c6c6c6';
                ctx.fillRect(remainX + j * mw, remainY + i * mh, mw, mh)
            }
        }
    }
    console.log("11")

}
