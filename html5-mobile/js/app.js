(function (namespace) {
    var DEFAULT_COLOUR = "#444";
    var GROUND_BUFFER = 10;
    var OFFSET_SPEED = 3;
    var state = "ready" //living  over
    var jump = false

    function rand(min, max) {
        var r = min + Math.random() * (max - min);
        return Math.round(r);
    }

    function keydown(e) {
        if (state == "ready") {
            state = "living"
        } else {
            jump = true
        }
        e.stopPropagation();
    }

    function keyup(e) {
        jump = false;
        e.stopPropagation();
    }



    function Game(options) {
        this.width = $(window).get(0).innerWidth;
        this.height = $(window).get(0).innerHeight;
        $("#game").attr("width", this.width);
        $("#game").attr("height", this.height);
        this.canvas = options.el;
        this.context = this.canvas.getContext("2d");
        this.init();
        requestAnimationFrame(this.update.bind(this));
    }

    Game.prototype.init = function () {
        this.cactis = [];
        this.gameover = false;
        this.background = new Background({
            context: this.context,
            width: this.canvas.width,
            height: this.canvas.height,
            colour: DEFAULT_COLOUR
        });
        this.player = new Sprite({
            context: this.context,
            x: 10,
            y: this.canvas.height - GROUND_BUFFER
        });
        this.player.on_update(function (self) {
            // self.x += 1;
        })
        this.score = 0;
        this.status = "ready";
        this.offset = 0;
        var self = this;
        this.time = 0;
        document.addEventListener('touchstart', function (e) {
            console.log('touch')
            self.on_touch(e);
        }, false);
    };

    Game.prototype.on_touch = function (e) {
        console.log(this.status)
        if (this.status == "ready") {
            console.log('setting liveing')
            this.cactis = [];
            this.score = 0;
            this.offset = 0;
            this.player.wideEyed = false;
            this.player.stop = false;
            this.gameover = false;
            this.status = "living";
        } else if (this.status == "living") {
            this.player.jump();
        } else if (this.status == "gameover") {
            this.status = "ready";
        }
        e.stopPropagation();
    }


    document.addEventListener('touchend', keyup, false);

    Game.prototype.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    Game.prototype.update = function () {
        this.clear();
        this.background.draw(this.context, this.offset);
        if (this.gameover) {
            this.context.fillStyle = this.colour;
            this.context.font = "40px Courier";
            this.context.textAlign = "center";
            this.context.fillText('GameOver', this.width / 2, this.height / 2);
            this.context.font = "12px Courier";
            this.context.textAlign = "center";
            this.context.fillText('double click to restart', this.width / 2, this.height / 2 + 20);
        }
        this.player.draw();
        if (this.status == "living") {
            this.offset += OFFSET_SPEED;
            this.time++;
            if (this.time % 100 == 0) {
                this.cactis.push(new Cactus({
                    left: this.width,
                    bottom: this.canvas.height - GROUND_BUFFER,
                    scale: 1,
                    leftSize: rand(0, 2),
                    rightSize: rand(0, 2),
                    centerSize: rand(0, 2),
                    colour: DEFAULT_COLOUR
                }));
            }
            this.player.update();
            for (var i = 0; i < this.cactis.length; i++) {
                this.cactis[i].update(OFFSET_SPEED);
                if (this.cactis[i].x <= 52 && this.cactis[i].y < this.player.y + this.player.height / 2) {
                    console.log('gameover')

                    this.player.stop = true;
                    this.player.wideEyed = true;
                    this.status = "gameover";
                    this.gameover = true;
                    // return;
                }
                if (this.cactis[i].x <= -10) {
                    this.cactis.splice(i, 1);
                    this.score += 1;
                }
            }
        }
        this.player.draw();
        this.context.fillStyle = this.colour;
        this.context.font = "16px Courier";
        this.context.textAlign = "left";
        this.context.fillText('score:' + this.score, 10, 20);
        for (var i = 0; i < this.cactis.length; i++) {
            this.cactis[i].draw(this.context);
        }

        requestAnimationFrame(this.update.bind(this));
    };

    namespace.Game = Game;
})(window);