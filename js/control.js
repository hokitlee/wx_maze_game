import {p} from "./para";
import {mRender} from "./m_render";
import {Maze} from "./map/Maze";
import {transform} from "./map/omap";
import {ini} from "./main";

let imgSrc = ['img/3.png', 'img/2.png', 'img/1.png', 'img/0.png']
export let control = {

    start: () => {
        p.start = true;
        p.player.isWin = false;
        // shouHit();
        window.requestAnimationFrame(frame.bind(this));

        function frame() {
            mRender();
            p.player.drawTo();
            test();
            if (!p.start || p.player.isWin) {
                showWin();
                showAgainToast();
                return
            }
            window.requestAnimationFrame(frame)
        }
    },


    showModal: () => {
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
    },

    showToast: () => {
        let showToastTime = 0;
        let inteId = setInterval(() => {
            wx.showToast({
                title: "title",
                icon: "111",
                mask: false,
                image: "a",
                duration: 500,
                success: () => {
                    console.log("success")
                },
                complete: () => {
                    if (showToastTime == 2) {
                        clearInterval(inteId)
                    }
                    showToastTime++;
                }
            })
        }, 1500)


    },

    countdown: () => {
        let time = 3;
        let id = setInterval(() => {
            console.log("#######")
            if (time < 0) {
                clearInterval(id)
            }
            let img = wx.createImage();
            img.src = imgSrc[time]
            p.ctx.drawImage(img, 100, 200, 300, 300)
        }, 1500)
    }
};

function test() {


}

let showWin = () => {
    wx.showToast({
        title: "恭喜你走出迷宫！",
        // icon: "111",
        mask: false,
        // image: "a",
        duration: 3 * 1000,
        success: () => {
            console.log("success")
        },
        complete: () => {
            // if (showToastTime == 2) {
            //     clearInterval(inteId)
            // }
            // showToastTime++;
            // console.log("!!!!!!!!!!!")
        }
    })
};
let showAgainToast = () => {
    let id = setInterval(() => {
        wx.showModal({
            title: "过关成功!",
            content: "点击继续哦~",
            showCancel: false,
            cancelColor: "#000000",
            confirmText: "再次游戏",
            cancelText: "取消",
            //确定按钮颜色
            confirmColor: "#3cc51f",
            success: ({confirm, cancel}) => {
                if (confirm) {
                    ini()
                    control.start()
                    console.log(confirm)
                }
            },
            fail: () => {
                console.log("调用失败")
            },
            complete: () => {
                console.log("完成")
            }
        });
        clearInterval(id);
    }, 3000)

};
export let shouHit = () => {
    wx.showModal({
        title: "说明",
        content: "只需要滑动一个方向，小猪就能沿着方向走到分叉口",
        showCancel: false,
        cancelColor: "#000000",
        confirmText: "我知道了",
        cancelText: "取消",
        //确定按钮颜色
        confirmColor: "#3cc51f",
        success: ({confirm, cancel}) => {
        },
        fail: () => {
        },
        complete: () => {
        }
    });
}