define(["jquery", "container", "camera", "socket"], function($, container, camera, socket) {
	'use strict';
	// TODO come up with a better name for this module

    // TODO maybe move this to a separate file when it becomes needed elsewhere
    // or perhaps a property of the ui object
    var username;

    var composeUserlistHtml = function(userlist) {
    	return userlist.map(function(u) {
    		return '<li>' + u + '</li>';
    	}).join('');
    }

	return {
		init: function() {

			// Hook up form submit to send chat message
			$('#chat form').submit(function() {
				var message = $('#m').val();
				if (!message) return false;

				socket.emit('chat message', {
					message: message,
					username: username
				});
				$('#m').val('');
				return false;  // don't refresh the page
			});

			socket.on('chat message', function(msg) {
				// Append message
				$('#messages').append($('<li>').text(msg.username + ': ' + msg.message));
				// Scroll to bottom
				var el = $('#messages').get(0);
				el.scrollTop = el.scrollHeight;
			});

			socket.on('userlist', function(userlist) {
				$('#userlist').html(composeUserlistHtml(userlist));
			});

		},

		register: function() {
			var deferred = $.Deferred();

	        // username registration
	        var register = function() {
				username = $('input[name=username]').val();
				
				// TODO: Use html5 form validation for this
				if (!username) {
					alert('Please type a username.');
					return;
				}

				socket.emit('registration', {
					username: username
				});
				$('#splash').remove();
				$('#game').css('visibility', 'visible');
				deferred.resolve();
				return false;
			};
			$('#splash button').on('click', register);
			$('#splash input').on('keydown', function(e) {
				if (e.keyCode === 13) register();
			});

			return deferred;
		}
	};

});
