(function (namespace) {
    function Sprite(options) {
        this.context = options.context;
        this.x = options.x;
        this.y = options.y;
        this.color = '#444';
        this.stop = true;
        this.right = false;
        this.left = false;
        this.time = 0;
        this.vy = 0;
        this.vytime = 0;
        this.g = 20;
        this.jump_back_y = this.y;
        this.width = 52;
        this.height = 52;
    }

    Sprite.prototype.jump = function () {
        if (this.y == this.jump_back_y) {
            this.vy = -1 * this.g;
            this.jump_back_y = this.y
        }
    }

    Sprite.prototype.up = function () {

    }

    Sprite.prototype.on_update = function (cb) {
        var self = this
        this.up = function () {
            cb(self)
        }
    }

    Sprite.prototype.update = function () {
        this.y += this.vy;
        if (this.vy < 0) {
            this.vy *= 0.8;
            if (this.vy >= -0.1) {
                this.vy = 1;
            }
        } else if (this.vy > 0) {
            this.vy *= 1.2;
            if (this.y >= this.jump_back_y) {
                this.vy = 0;
                this.y = this.jump_back_y;
            }
        }
        this.up()
    }

    Sprite.prototype.draw = function (ctx) {
        var x = this.x;
        var y = this.y;
        this.context.fillStyle = this.color;
        // tail
        this.context.fillRect(x, y - 36, 2, 16);
        this.context.fillRect(x + 2, y - 32, 2, 16);
        this.context.fillRect(x + 4, y - 30, 2, 16);
        this.context.fillRect(x + 6, y - 28, 2, 16);
        this.context.fillRect(x + 8, y - 28, 2, 18);
        this.context.fillRect(x + 10, y - 30, 2, 22);
        this.context.fillRect(x + 12, y - 32, 4, 26);
        this.context.fillRect(x + 16, y - 34, 4, 26);
        this.context.fillRect(x + 20, y - 36, 4, 30);
        this.context.fillRect(x + 24, y - 38, 2, 30);
        this.context.fillRect(x + 26, y - 38, 2, 28);
        this.context.fillRect(x + 28, y - 52, 2, 40);

        if (this.wideEyed) {
            this.context.fillRect(x + 30, y - 54, 6, 2);
            this.context.fillRect(x + 32, y - 50, 2, 2);
            this.context.fillRect(x + 30, y - 46, 2, 32);
            this.context.fillRect(x + 32, y - 46, 2, 30);
            this.context.fillRect(x + 34, y - 46, 2, 28);
        } else {
            this.context.fillRect(x + 30, y - 54, 2, 40);
            this.context.fillRect(x + 32, y - 54, 2, 4);
            this.context.fillRect(x + 32, y - 48, 2, 32);
            this.context.fillRect(x + 34, y - 54, 2, 36);
        }
        this.context.fillRect(x + 36, y - 54, 2, 34);
        this.context.fillRect(x + 38, y - 54, 2, 20);
        this.context.fillRect(x + 40, y - 54, 12, 16);
        this.context.fillRect(x + 52, y - 52, 2, 14);

        if (this.wideEyed) {
            this.context.fillRect(x + 38, y - 34, 8, 2);
        } else {
            this.context.fillRect(x + 40, y - 36, 8, 2);
        }

        // arm (singular)
        this.context.fillRect(x + 36, y - 26, 4, 2);
        this.context.fillRect(x + 40, y - 26, 2, 4);


        if (this.stop) {

        } else {
            //not jump or down
            if (this.vy == 0) {
                this.time++;
                if (this.time % 20 == 0) {
                    this.left = true;
                    this.right = false;
                }
                if (this.time % 40 == 0) {
                    this.left = false;
                    this.right = true;
                }
            }
        }

        if (this.right) {
            y -= 4;
        }

        if (this.left) {

        }



        // back leg
        this.context.fillRect(x + 12, y, 4, 2);
        this.context.fillRect(x + 12, y - 6, 2, 8);
        this.context.fillRect(x + 14, y - 6, 2, 3);
        this.context.fillRect(x + 16, y - 8, 2, 3);

        if (this.right) {
            y += 4;
        }

        if (this.left) {
            y -= 4;
        }

        // // front leg
        this.context.fillRect(x + 22, y, 4, 2);
        this.context.fillRect(x + 22, y - 6, 2, 8);
    }
    namespace.Sprite = Sprite;
})(window);