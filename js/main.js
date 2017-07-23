 "use strict";

(function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    var head;
    var tail = [];
    var apple;
    var animation;
    var snakeSize = 40;
    
    function restart(){
        head = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize , (Math.floor(window.innerHeight / snakeSize)/2) * snakeSize - snakeSize * 2 , "silver" , snakeSize , -1);
        apple = new Apple ("green" , snakeSize);
        tail = [];
        for(var i=0 ; i < 2 ; i++){
            tail[i] = new Rectangle (head.x , head.y-snakeSize * (i + 1) , "black" , snakeSize , i);
        };
        clearInterval(animation);
        animation = setInterval(draw , 200);
    };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    function draw() {
        context.beginPath();
        context.clearRect(0 , 0 , window.innerWidth , window.innerHeight);
        context.rect(0 , 0 , window.innerWidth , window.innerHeight);
        context.fillStyle = 'white';
        context.fill();
        context.closePath();

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

    function Rectangle(x , y , color , size , number){
        this.x = x;
        this.y = y;
        this.direction = "down";
        this.number = number;
        this.size = size;
        this.color = color;
        this.draw = function() {
            for(var i = 0 ; i < tail.length ; i++){
                if(this.x === tail[i].x && this.y === tail[i].y && this.number === -1){
                    this.color = "red";
                };
            };
            if(this.number === -1 && (this.x < 0 || this.y < 0 || this.x > window.innerWidth || this.y > window.innerHeight)){
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
            context.rect(this.x , this.y , this.size , this.size);
            context.fill();
            context.closePath();
        };
    };

    function Apple(color,size) {
        this.size = size;
        this.x = Math.floor(Math.random() * (Math.floor(window.innerWidth / this.size) + 1)) * this.size;
        this.y = Math.floor(Math.random() * (Math.floor(window.innerHeight / this.size) + 1)) * this.size;
        this.color=color;
        this.draw = function() {
            if(this.x === head.x && this.y === head.y){
                tail.push(new Rectangle(tail[tail.length-1].x , tail[tail.length - 1].y - snakeSize , "black" , snakeSize , tail.length));
                this.x = Math.floor(Math.random() * (Math.floor(window.innerWidth / this.size) + 1)) * this.size;
                this.y = Math.floor(Math.random() * (Math.floor(window.innerHeight / this.size) + 1)) * this.size;
            };
            context.beginPath();
            context.fillStyle = this.color;
            context.rect(this.x , this.y , this.size , this.size);
            context.fill();
            context.closePath();
        };
    };

    resizeCanvas();
    restart();

})();