import {control,shouHit} from "./control";
import {Maze} from './map/Maze.js'
import {p} from './para'
import {mRender} from './m_render'
import {transform} from './map/omap'
import {Player} from "./player/player";

require('../libs/weapp-adapter');

export function Main() {
    touchEvent();
    ini();
    mRender();
    shouHit();
    control.start()
}

export function ini() {
    p.screenWidth = window.innerWidth;
    p.screenHeight = window.innerHeight;
    p.ctx = canvas.getContext('2d');
    let mul = p.screenHeight / p.screenWidth;
    p.countX = 31;
    p.countY = Math.floor(p.countX * mul);
    p.countY = p.countY % 2 == 1 ? p.countY : p.countY + 1;
    p.remainX = 10;
    p.remainY = 10;
    p.mw = (p.screenWidth - p.remainX) / p.countX;
    p.mw = Math.ceil(p.mw * 1000) / 1000;
    p.mh = (p.screenHeight - p.remainY) / p.countY;
    p.mh = Math.ceil(p.mh * 1000) / 1000;
    p.remainX = (p.screenWidth - p.mw * p.countX) / 2;
    p.remainY = (p.screenHeight - p.mh * p.countY) / 2;
    let maze = new Maze(p.countX, p.countY);
    p.map = transform(maze.create());
    p.player = new Player(p.remainX, p.remainY, p.mw, p.mh);
    //初始化出口
    p.mapEndX = p.countX - 1;
    p.mapEndY = p.countY - 1;

}

function touchEvent() {
    wx.onTouchStart((e) => {
        p.tcx = e.changedTouches[0].clientX;
        p.tcy = e.changedTouches[0].clientY;
    });

    wx.onTouchEnd(e => {
        // console.log(e)
        let x = e.changedTouches[0].clientX;
        let y = e.changedTouches[0].clientY;
        x -= p.tcx;
        y -= p.tcy;
        let f = 0;
        if (x > 0 && y < 0) {
            f = x > Math.abs(y) ? 1 : 0;
        } else if (x > 0 && y > 0) {
            f = x > y ? 1 : 2;
        }//3
        else if (x < 0 && y > 0) {
            f = Math.abs(x) > y ? 3 : 2;
        } else if (x < 0 && y < 0) {
            f = Math.abs(x) > Math.abs(y) ? 3 : 0;
        }
        let rx = p.player.rx;
        let ry = p.player.ry;
        switch (f) {
            case 0: {
                if (ry != 0 && p.map[ry - 1][rx].block == 0)
                    return;
                p.player.mov(rx, ry - 1, f)
                break;
            }
            case 1: {
                if (rx < p.countX - 1 && p.map[ry][rx + 1].block == 0)
                    return;
                p.player.mov(rx + 1, ry, f)
                break;
            }
            case 2: {
                if (ry < p.countY - 1 && p.map[ry + 1][rx].block == 0)
                    return;
                p.player.mov(rx, ry + 1, f)
                break;
            }
            case 3: {
                if (rx != 0 && p.map[ry][rx - 1].block == 0)
                    return;
                p.player.mov(rx - 1, ry, f)
                break;
            }
        }
    })
}


function test() {
    wx.showModal({
        title: "title",
        content: "content",
        showCancel: true,
        cancelColor: "#000000",
        confirmText: "确定",
        cancelText: "取消",
        confirmColor: "#3cc51f",
        success: ({confirm, cancel}) => {
        },
        fail: () => {
            console.log("调用失败")
        },
        complete: () => {
            console.log("完成")
        }
    })
}
