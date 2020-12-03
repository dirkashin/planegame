class Enemy{
    constructor(type,count){
        this.type = type;
        this.main = document.querySelector(".main");

        this.count = count;
        this.score = document.querySelector(".score");``
        this.create();
    }
    create(){
        // 大中小三种飞机
        switch(this.type){
            case 1:
                this.ele = createDiv(this.main,"enemy-small");
                this.speed = 3;     // 敌机速度
                this.hp = 1;        // 敌机血量
                this.dieNum = 3;    // 敌机爆炸的图片数量
                this.fraction = 5;  // 敌机的分数
                break;
            case 2:
                this.ele = createDiv(this.main,"enemy-middle");
                this.speed = 2;
                this.hp = 3;
                this.dieNum = 4;
                this.fraction = 10;
                break;
            case 3:
                this.ele = createDiv(this.main,"enemy-large");
                this.speed = 1;
                this.hp = 6;
                this.dieNum = 6;
                this.fraction = 20;
                break;
        }
        // 敌机初始位置（随机）
        this.ele.style.left = random(0,this.main.offsetWidth-this.ele.offsetWidth) + "px";
        this.ele.style.top = -this.ele.offsetHeight + "px";
        // 执行移动功能
        this.move();
    }
    move(){
        this.ele.t = setInterval(()=>{
            // 高度逐渐增加，出了地图就爆炸
            if(this.ele.offsetTop > this.main.offsetHeight){
                
                // 爆炸
                this.die();
            }else{
                // 移动
                this.ele.style.top = this.ele.offsetTop + this.speed + "px";
                // 撞到子弹
                // console.log(plane.aBullet);
                for(let i=0;i<plane.aBullet.length;i++){
                    if(
                        // 子弹和敌机碰撞
                        plane.aBullet[i].ele.offsetLeft + plane.aBullet[i].ele.offsetWidth > this.ele.offsetLeft &&
                        this.ele.offsetLeft + this.ele.offsetWidth > plane.aBullet[i].ele.offsetLeft &&
                        this.ele.offsetTop + this.ele.offsetHeight > plane.aBullet[i].ele.offsetTop &&
                        plane.aBullet[i].ele.offsetTop + plane.aBullet[i].ele.offsetHeight > this.ele.offsetTop

                    ){
                        // 子弹撞到敌机后，立即爆炸
                        plane.aBullet[i].die();

                        // 敌机的血量减少
                        this.hp--;
                        // 当敌机血量低于1
                        if(this.hp <= 0){
                            // 敌机爆炸
                            this.count.innerHTML = parseInt(this.count.innerHTML) + this.fraction;
                            this.die();
                        }
                    }
                }

                // 我的飞机和敌机碰撞结束游戏
                if(
                    plane.ele.offsetLeft + plane.ele.offsetWidth > this.ele.offsetLeft &&
                        this.ele.offsetLeft + this.ele.offsetWidth > plane.ele.offsetLeft &&
                        this.ele.offsetTop + this.ele.offsetHeight > plane.ele.offsetTop &&
                        plane.ele.offsetTop + plane.ele.offsetHeight > this.ele.offsetTop
                    
                ){
                    // console.log("我的飞机撞到敌机了，我的飞机挂掉");
                    clearInterval(this.ele.t);
                    this.score.innerHTML = this.count.innerHTML;
                    plane.die();
                }
            }
        },30)
    }
    die(){
        clearInterval(this.ele.t);
        let i = 0;
        this.ele.t2 = setInterval(()=>{
            if(i === this.dieNum){
                clearInterval(this.ele.t2);
                this.ele.remove();
            }else{
                i++;
            }
            // 敌机爆炸的图片
            this.ele.style.backgroundImage = `url(images/plane${this.type}_die${i}.png)`;
        },50);
    }
};

function random(max,min){
    return Math.round(Math.random()*(max-min)+min);
}