define(["objects", "socket", "lodash"], function(objects, socket, _) {
	'use strict';

	var RATE = 30; // num of milliseconds between position messages

	var Moveable = function(object) {
		var self = this;

		// The last timestamp this object's move method sent data to the server
		self.lastEmittedTime = Number.NEGATIVE_INFINITY;

		self.object = object;
		this.move = function(coords) {
			var x = _.isNumber(coords.x) ? coords.x : self.object.position.x;
			var y = _.isNumber(coords.y) ? coords.y : self.object.position.y;
			var z = _.isNumber(coords.z) ? coords.z : self.object.position.z;

			self.object.position.x = x;
			self.object.position.y = y;
			self.object.position.z = z;

			var now = Date.now();
			if (now - self.lastEmittedTime > RATE) {
				self.lastEmittedTime = now;
				socket.emit('move', {
					x: x,
					y: y,
					z: z
				});
			}
		};
	};

	var moveables = {
		card: new Moveable(objects.card)
	};

	socket.on('move', function(msg) {
		moveables.card.move(msg);
	});

	return moveables;

});