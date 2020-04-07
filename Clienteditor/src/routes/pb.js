import pubnub from '../components/pubnub.js';

(function () {
  var box = document.getElementById('box'),
    input = document.getElementById('input'),
    channel = 'chat';
  pubnub.subscribe({ channels: [channel] }); // Subscribe to a channel.
  pubnub.addListener({
    message: function (m) {
      box.innerHTML =
        ('' + m.message).replace(/[<>]/g, '') + '<br>' + box.innerHTML; // Add message to page.
    },
  });
  if (input) {
    input.addEventListener('keypress', function (e) {
      (e.keyCode || e.charCode) === 13 &&
        pubnub.publish({
          // Publish new message when enter is pressed.
          channel: channel,
          message: input.value,
          x: (input.value = ''),
        });
    });
  }
})();
