import {p} from "../para";

class MapP {
    constructor(x, y, sx, sy, color, block) {
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.color = color;
        this.block = block;
    }

    reden(ctx) {
        p.ctx.fillStyle = this.color;
        p.ctx.fillRect(this.x, this.y, this.sx, this.sy)
    }

}

export function transform(oMap) {
    let map = [];
    for (let j = 0; j < oMap.length; j++) {
        map[j] = []
        for (let i = 0; i < oMap[0].length; i++) {
            let color = oMap[j][i] % 2 == 1 ? "#d7abb8" : "#83885e"
            let block = oMap[j][i] % 2 == 1 ? 1 : 0
            let mapP = new MapP(
                p.remainX + i * p.mw,
                p.remainY + j * p.mh,
                p.mw + 1,
                p.mh + 1,
                color, block
            )
            map[j].push(mapP)
        }
    }
    return map;
}

