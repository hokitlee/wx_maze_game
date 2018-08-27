import {p} from './para'

export function mRender() {
    renderMap()
    renderEnd()
}

function renderMap() {
    p.ctx.fillStyle = "#D7ABB8"
    p.ctx.fillRect(0, 0,p.screenWidth,p.screenHeight)
    for (let i = 0; i < p.countY; i++) {
        for (let j = 0; j < p.countX; j++) {
            p.map[i][j].reden(p.ctx)
        }
    }
}

function renderEnd() {
    let img = new wx.createImage();
    img.src = 'img/end.png'
    p.ctx.drawImage(
        img,
        p.map[p.countY-1][p.countX-1].x-6,
        p.map[p.countY-1][p.countX-1].y-6,
        p.mw + 12,
        p.mh + 12
    );
}