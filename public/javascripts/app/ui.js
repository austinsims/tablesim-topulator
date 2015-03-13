define(["jquery", "container", "camera", "socketio"], function($, container, camera, io) {
	'use strict';
	// TODO come up with a better name for this module

    var socket = io();

    // TODO maybe move this to a separate file when it becomes needed elsewhere
    // or perhaps a property of the ui object
    var username;

	return {
		init: function() {

			// Hook up form submit to send chat message
			$('#chat form').submit(function() {
				socket.emit('chat message', {
					message: $('#m').val(),
					username: username
				});
				$('#m').val('');
				return false;  // don't refresh the page
			});

			socket.on('chat message', function(msg) {
				$('#messages').append($('<li>').text(msg.username + ': ' + msg.message));
			});

		},

		register: function() {
			var deferred = $.Deferred();

	        // username registration
			$('#splash form').submit(function() {
				username = $('input[name=username]').val();
				socket.emit('registration', {
					username: username
				});
				$('#splash').remove();
				$('#game').css('visibility', 'visible');
				deferred.resolve();
				return false;
			});

			return deferred;
		}
	};

});
