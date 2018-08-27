import {p} from '../para'

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Player {
    constructor(x, y, sx, sy) {
        this.rx = 0;
        this.ry = 0;
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.queue = [];
        this.nInx = 0;
        this.nIny = 0;
        this.speed = 5;
        this.timerId = false;
        this.img = new wx.createImage();
        this.img.src = 'img/p2.png';
        this.isWin = false
    }

    mov(x,y,ind) {
        this.queue = [];
        // this.queue.push(new Point(x,y))
        this.compute.bind(this);
        this.compute(x,y,ind);
        let point = this.queue.shift();
        this.nInx = point.x;
        this.nIny = point.y;
        // this.timerId = setInterval(this.setMov.bind(this), 10)
        this.timerId = true;
        requestAnimationFrame(this.setMov.bind(this))
    }

    compute(x,y,ind) {
        this.queue.push(new Point(x,y));
        let n = p.map;
        let east = false;
        let south = false;
        let west = false;
        let north = false;
        let count = 0;
        if (ind != 2 && y != 0 && n[y - 1][x].block == 1) {
            east = true;
            count++;
        }
        if (ind != 3 && x < p.countX - 1 && n[y][x + 1].block == 1) {
            south = true;
            count++;
        }
        if (ind != 0 && y < p.countY - 1 && n[y + 1][x].block == 1) {
            west = true;
            count++;
        }
        if (ind != 1 && x != 0 && n[y][x - 1].block == 1) {
            north = true;
            count++;
        }
        if (count > 1) {
            return;
        }
        else {
            if (east) {
                this.compute( x ,y - 1, 0)
            } else if (south) {
                this.compute(x + 1,y, 1)

            } else if (west) {
                this.compute(x,y + 1,  2)

            } else if (north) {
                this.compute(x - 1,y,  3)
            }
        }
    }

    setMov() {
        let fazhi = 3;
        let n = p.map;
        if (this.rx == this.nInx && this.ry > this.nIny) {
            if (this.y - n[this.nIny][this.nInx].y < fazhi) {
                this.outQu();
            }
            else{
                this.y -= this.speed;
            }
        }
        else if (this.ry == this.nIny && this.rx < this.nInx) {
            if (n[this.nIny][this.nInx].x - this.x < fazhi) {
                this.outQu();
            }
            else{
                this.x += this.speed;
            }
        }
        else if (this.rx == this.nInx && this.ry < this.nIny) {
            if (n[this.nIny][this.nInx].y - this.y < fazhi) {
                this.outQu();
            }
            else{
                this.y += this.speed;
            }
        }
        else if (this.ry == this.nIny && this.rx > this.nInx) {
            if (this.x - n[this.nIny][this.nInx].x < fazhi) {
                this.outQu();
            }else{
                this.x -= this.speed;
            }
        }
        this.cheak()
        if(this.timerId){
            requestAnimationFrame(this.setMov.bind(this))
        }
    }

    outQu() {
        this.rx = this.nInx;
        this.ry = this.nIny;
        if (this.queue.length == 0) {
            this.timerId = false;
            // this.cheak()
            return
        }
        let tmp = this.queue.shift();
        this.nInx = tmp.x;
        this.nIny = tmp.y;
    }
    drawTo() {
        p.ctx.drawImage(this.img,this.x-4, this.y-4, this.sx+12, this.sy+12)
    }

    cheak(){
        if (this.rx == p.mapEndX && this.ry == p.mapEndY) {
            this.isWin = true;
        }
    }
}