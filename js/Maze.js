let vis = []
 class Point {
    constructor(x, y, v = 0) {
        this.x = x;
        this.y = y;
        this.v = v;
    }
}
export class Maze {
    constructor(x, y) {
        this.x = y;
        this.y = x;
    }

    create() {
        let x = this.x;
        let y = this.y;
        this.map = [];
        for (let i = 0; i < x; i++) {
            this.map[i] = [];
            for (let j = 0; j < y; j++) {
                this.map[i][j] = 0;
            }
        }
        this.map[0][0] = 1;
        vis.push(new Point(0, 1))
        vis.push(new Point(1, 0))
        while (vis.length != 0) {
            let rand = this.getRandomInt(vis.length)
            let v = vis[rand];
            if (v.x - 1 >= 0 && v.x + 1 < x && this.map[v.x + 1][v.y] + this.map[v.x - 1][v.y] == 1) {
                let point = this.map[v.x - 1][v.y] == 1 ? new Point(v.x + 1, v.y) : new Point(v.x - 1, v.y)
                this.map[v.x][v.y] = 1;
                this.map[point.x][point.y] = 1;
                let sel = this.getQiang(point)
                sel.forEach(e => {
                    vis.push(e)
                })
            }
            else if (v.y - 1 >= 0 && v.y + 1 < y && this.map[v.x][v.y - 1] + this.map[v.x][v.y + 1] == 1) {
                let point = this.map[v.x][v.y - 1] == 1 ? new Point(v.x, v.y + 1) : new Point(v.x, v.y - 1)
                this.map[v.x][v.y] = 1;
                this.map[point.x][point.y] = 1;
                let sel = this.getQiang(point)
                sel.forEach(e => {
                    vis.push(e)
                })
            } else {
                this.map[v.x][v.y] = 0;
            }
            vis.splice(rand, 1)
        }

        return this.map;
    }

    getQiang(v) {
        let sel = [];
        if (v.x + 1 < this.x && this.map[v.x + 1][v.y] == 0) {
            sel.push(new Point(v.x + 1, v.y))
        }
        if (v.y + 1 < this.y && this.map[v.x][v.y + 1] == 0) {
            sel.push(new Point(v.x, v.y + 1))
        }
        if (v.x - 1 >= 0 && this.map[v.x - 1][v.y] == 0) {
            sel.push(new Point(v.x - 1, v.y))
        }
        if (v.y - 1 >= 0 && this.map[v.x][v.y - 1] == 0) {
            sel.push(new Point(v.x, v.y - 1))
        }
        return sel;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}