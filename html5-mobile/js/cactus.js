(function (namespace) {
	function Cactus(options) {
		this.scale = 1;
		this.x = options.left;
		this.y = options.bottom;
		this.colour = options.colour;
		this.leftSize = options.leftSize;
		this.centerSize = options.centerSize;
		this.rightSize = options.rightSize;
	}
	Cactus.prototype.update = function (OFFSET_SPEED) {
		this.x -= OFFSET_SPEED;
	}

	Cactus.prototype.draw = function (context) {
		var x = this.x,
			y = this.y,
			scale = this.scale;

		context.fillStyle = this.colour;

		// center
		var height = 15 * this.centerSize;
		context.fillRect(x + 6 * scale, y - (20 + height) * scale, 6 * scale, height * scale);
		context.fillRect(x + 7 * scale, y - (20 + height + 1) * scale, 4 * scale, 1 * scale);
		context.fillRect(x + 6 * scale, y - 20 * scale, 6 * scale, 20 * scale);

		// left
		height = 15 * this.leftSize;
		context.fillRect(x, y - (15 + height) * scale, 4 * scale, height * scale);
		context.fillRect(x + 1 * scale, y - (15 + height + 1) * scale, 2 * scale, 1 * scale);
		context.fillRect(x + 4 * scale, y - 19 * scale, 4 * scale, 4 * scale);

		// right
		height = 15 * this.rightSize;
		context.fillRect(x + 14 * scale, y - (15 + height) * scale, 4 * scale, height * scale);
		context.fillRect(x + 15 * scale, y - (15 + height + 1) * scale, 2 * scale, 1 * scale);
		context.fillRect(x + 12 * scale, y - 19 * scale, 4 * scale, 4 * scale);
	};

	namespace.Cactus = Cactus;
})(window);