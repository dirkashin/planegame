let plane = {
    create(){
        // 创建我的飞机
        this.main = document.querySelector(".main");
        // console.log(this);
        this.ele = createDiv(this.main,"my-warplain");
        this.ele.style.left = (this.main.offsetWidth - this.ele.offsetWidth)/2 + "px";
        this.ele.style.top = this.main.offsetHeight - this.ele.offsetHeight + "px";
        
    
        // 随鼠标移动
        this.move();

    },
    move(){
        let that = this;
        document.onmousemove = function(eve){
            let e = eve || window.event;
            // 计算位置
            let l = e.clientX - that.main.offsetLeft - that.ele.offsetWidth/2;
            let t = e.clientY - that.ele.offsetHeight/2;

            // 边界限定
            if(l<-that.ele.offsetWidth/2) l=-that.ele.offsetWidth/2;
            if(t<0) t=0;
            if(l>that.main.offsetWidth - that.ele.offsetWidth + that.ele.offsetWidth/2 - 4 ){
                l = that.main.offsetWidth - that.ele.offsetWidth +  that.ele.offsetWidth/2 - 4;
            }

            // 设置位置
            that.ele.style.left = l + "px";
            that.ele.style.top = t + "px";
        }
    },
    fire(i){
        // console.log(i);

        // 连续创建子弹
        this.ele.fireTime = setInterval(()=>{
            this.aBullet.push(new Bullet());
        },i*150);

    },
    aBullet:[],

    // 结束游戏
    die(){
        // 清除了移动事件
        document.onmousemove = null;
        // 停止开火
        clearInterval(this.ele.fireTime);
        // 弹出游戏结束的提示，不要使用alert
        this.mask = document.querySelector(".mask");
        this.mask.style.display = "block";
        let i=0;
        this.ele.t = setInterval(() => {
            if(i >= 4){
                // 清除爆炸动画
                clearInterval(this.ele.t);
                // 删除我的飞机
                this.ele.remove();
            }else{
                i++;
            }
            this.ele.style.backgroundImage = `url(images/me_die${i}.png)`
        }, 500);
    }
}