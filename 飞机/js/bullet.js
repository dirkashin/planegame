function Bullet(){
    this.main = document.querySelector(".main");

    this.create();
}
Bullet.prototype = {
    constructor:Bullet,
    create(){
        // 创建子弹
        this.ele = createDiv(this.main,"bullet");
        this.ele.style.left = plane.ele.offsetLeft + plane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + 2 +  "px";
        this.ele.style.top = plane.ele.offsetTop - this.ele.offsetHeight + "px";
    
        // 子弹向上运动
        this.move();
    },
    move(i){
        let = speed = 6;
        this.ele.t = setInterval(()=>{
            // 如果到顶，就消失
            // 不到顶，就减top
            if(this.ele.offsetTop <= 0){
                // 执行消失功能
                this.die();
            }else{
                // 子弹移动
                this.ele.style.top = this.ele.offsetTop - speed + "px";
            }
        },30);
    },
    die(){
        clearInterval(this.ele.t);
        // 两个图片 表现 爆炸效果
        setTimeout(()=>{
            this.ele.className = "bullet_die";
        },50);
        setTimeout(()=>{
            this.ele.style.backgroundImage = "url(images/die2.png)";
        },100);
        setTimeout(()=>{
            this.ele.remove();
        },150);

        for(let i=0;i<plane.aBullet.length;i++){
            if(this.ele === plane.aBullet[i].ele){
                plane.aBullet.splice(i,1);
                break;
            }
        }
    }  
}