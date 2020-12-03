let engine = {
    init(){
        
        this.main = document.querySelector(".main");
        this.ops = document.querySelector(".options");
        // console.log(this.ops);

        this.count = document.querySelector(".count");
        this.reset = document.getElementById("reset");

        this.addEvent();
        // console.log(this);

    },
    addEvent(){
        var that = this;
        this.ops.addEventListener("click",function(eve){
            let e = eve || window.event;
            let tar = e.target || e.srcElement;
            if(tar.tagName === "LI"){
                that.index = parseInt(tar.getAttribute("index"));
                that.load();

                // 选择难度后，删除选择页面options
                this.remove();
            }
        })

        // 重新开始游戏
        this.reset.onclick = function(){
            location.reload();
        }
    },
    load(){
        // 背景图自动移动
        let i = 0;
        setInterval(()=>{
            this.main.style.backgroundPositionY = i++ + "px";
        },30);

        // 游戏logo
        this.logo = createDiv(this.main,"logo");
        // loading，class名，自带效果
        this.loading = createDiv(this.main,"loading");

            // loading图的移动
            let j = 1;
            this.loading.t = setInterval(()=>{
                this.loading.style.backgroundImage = `url(images/loading${j++%3+1}.png`
            },300);


        // 开始游戏
        setTimeout(()=>{
            // 删除logo
            this.logo.remove();
            // 清除 loading相关
            this.loading.remove();
            clearInterval(this.loading.t);

            // 执行开始游戏的功能
            this.gameStart();
        },10);
    },



    gameStart(){
        // 我的飞机
        plane.create();
        // 开火
        plane.fire(this.index);
        // 创建敌机
            // 小敌机
        this.little_enemy_time = setInterval(()=>{
            if(Math.random() > 0.2){
                new Enemy(1,this.count);
            }
        },500);

            // 中敌机
        this.middle_enemy_time = setInterval(()=>{
            if(Math.random() > 0.5 ){
                new Enemy(2,this.count);
            }
        },1000);
        
            // 大敌机
        this.big_enemy_time = setInterval(()=>{
            if(Math.random() > 0.7){
                new Enemy(3,this.count);
            }
        },2000);
    }
};


function createDiv(p,cn){
    var div = document.createElement("div");
    div.className = cn;
    p.appendChild(div);
    return div;
}
engine.init();