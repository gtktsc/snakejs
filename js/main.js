 "use strict";

(function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    var canvasWidth = document.getElementById('canvas-wrapper').offsetWidth;
    var canvasHeight = document.getElementById('canvas-wrapper').offsetHeight;
    var head;
    var tail = [];
    var apple;
    var animation;
    var color;
    var snakeSize = 40;
    var backgroundTile=[];
    var backgroundColor = "white";
    var backgroundLine = snakeSize/3;
    var backgroundLineColor = "#505A69";
    var sumX = (Math.floor(canvasWidth / snakeSize)%2==0?sumX = Math.floor(canvasWidth / snakeSize) : sumX = Math.floor(canvasWidth / snakeSize)-1);
    var sumY = (Math.floor(canvasHeight / snakeSize)%2==0?sumY = Math.floor(canvasHeight / snakeSize) : sumY = Math.floor(canvasHeight / snakeSize)-1);

    function restart(){
        head = new Rectangle ( (Math.floor(sumX)/2) * snakeSize , (Math.floor(sumY)/2) * snakeSize - snakeSize * 2 , "#A6A099" , -1);
        setColor();
        apple = new Apple (color);
        tail = [];
        for(var i=0 ; i < 2 ; i++){
            tail[i] = new Rectangle (head.x , head.y-snakeSize * (i + 1) , "#414143" , i);
        };
        var nr=0;
        for(var nrX=0;nrX<sumX;nrX++){
            for(var nrY=0;nrY<sumY;nrY++){
            backgroundTile[nr]= new Rectangle (snakeSize*nrX,snakeSize*nrY,backgroundColor,nr);
            backgroundTile[nr].isBackground=true;
            backgroundTile[nr].direction="none";
            nr++;
            };
        };
        clearInterval(animation);
        animation = setInterval(draw , 200);
    };
    function setColor(){
        switch(Math.floor(Math.random() * (5))){
            case 0:
                color = "#FA575C";
            break;
            case 1:
                color = "#47ADA0";
            break;
            case 2:
                color = "#8F63BF";
            break;
            case 3:
                color = "#FFC90A";
            break;
            case 4:
                color = "#FF823B";
            break;
        };
    };
    function resizeCanvas() {
        canvasWidth = document.getElementById('canvas-wrapper').offsetWidth;
        canvasHeight = document.getElementById('canvas-wrapper').offsetHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        sumX = (Math.floor(canvasWidth / snakeSize)%2==0?sumX = Math.floor(canvasWidth / snakeSize) : sumX = Math.floor(canvasWidth / snakeSize)-1);
        sumY = (Math.floor(canvasHeight / snakeSize)%2==0?sumY = Math.floor(canvasHeight / snakeSize) : sumY = Math.floor(canvasHeight / snakeSize)-1);

        restart();
    };
    function draw() {
        context.beginPath();
        context.clearRect(0 , 0 , canvasWidth , canvasHeight);
        context.rect(0 , 0 , canvasWidth , canvasHeight);
        context.fillStyle = 'white';
        context.fill();
        context.closePath();
        drawBackground();
        apple.draw();
        head.draw();
        for(var i = tail.length-1 ; i >= 0 ; i--){
            tail[i].draw();
            if(tail[i].number === 0){
                tail[i].direction = head.direction;
            }else{
                tail[i].direction = tail[i - 1].direction;
            };
        };
        if(head.color==="red"){
            restart();
        };
    };
    function drawBackground(){
        for(var nr=0;nr<backgroundTile.length;nr++){
            backgroundTile[nr].draw();
        };
    }
    function Rectangle(x , y , color ,  number){
        this.x = x;
        this.y = y;
        this.isBackground=false;
        this.direction = "down";
        this.number = number;
        this.size = snakeSize;
        this.color = color;
        this.draw = function() {
            for(var i = 0 ; i < tail.length ; i++){
                if(this.x === tail[i].x && this.y === tail[i].y && this.number === -1){
                    this.color = "red";
                };
            };
            if(this.number === -1 && (this.x < 0 || this.y < 0 || this.x > canvasWidth || this.y > canvasHeight)){
                this.color = "red";
            };
            switch(this.direction){
                case "up":
                    this.y = this.y - this.size;
                break;
                case "down":
                    this.y = this.y + this.size;
                break;
                case "left":
                    this.x = this.x - this.size;
                break;
                case "right":
                    this.x = this.x + this.size;
                break;
                case "none":
                break;
            };
            context.beginPath();
            context.fillStyle = this.color;
            if(this.isBackground){
                context.fillStyle = backgroundLineColor;
                context.rect(this.x+backgroundLine , this.y+backgroundLine , snakeSize-backgroundLine*2 , snakeSize-backgroundLine*2);
            }else{
                context.rect(this.x , this.y , this.size , this.size);
            };
            context.fill();
            context.closePath();
        };
    };
    function Apple(Color) {
        this.size = snakeSize;
        this.x = Math.floor(Math.random() * sumX) * this.size;
        this.y = Math.floor(Math.random() * sumY) * this.size;
        this.color=Color;
        this.draw = function() {
            if(this.x === head.x && this.y === head.y){
                setColor();
                this.color=color;
                tail.push(new Rectangle(tail[tail.length-1].x , tail[tail.length - 1].y - snakeSize , "#414143" , tail.length));
                this.x = Math.floor(Math.random() * sumX) * this.size;
                this.y = Math.floor(Math.random() * sumY) * this.size;
            };
            context.beginPath();
            context.fillStyle = this.color;
            context.rect(this.x , this.y , this.size , this.size);
            context.fill();
            context.closePath();
        };
    };
    window.addEventListener('resize' , resizeCanvas , false);
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 87: // W
            case 38: // up
                head.direction !== "down" ? head.direction = "up" : head.directory=head.directory;
            break;
            case 68: // D
            case 39: // down
                head.direction !== "left" ? head.direction = "right" : head.directory=head.directory;
            break;
            case 65: // A
            case 37: // left
                head.direction !== "right" ? head.direction = "left" : head.directory=head.directory;
            break;
            case 83: // S
            case 40: // down
                head.direction !== "up" ? head.direction = "down" : head.directory=head.directory;
            break;
        };
    });
    resizeCanvas();
    restart();

})();