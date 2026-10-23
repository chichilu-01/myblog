/* projector.js — the retro TV on the home page */
(function () {
  var IMAGES = ['maytinh1', 'anh1', 'tansho2', 'maytinh2', 'soba', 'pizza', 'avatar'];
  var isPowerOn = false;
  var channel = 0;

  document.addEventListener('DOMContentLoaded', function () {
    var screen = document.getElementById('post-screen');
    var title = document.getElementById('post-title');
    var excerpt = document.getElementById('post-excerpt');
    var img = document.getElementById('post-image');
    var hint = document.getElementById('tv-hint');
    var powerBtn = document.getElementById('power-btn');
    var channelBtn = document.getElementById('channel-btn');
    if (!screen || !powerBtn || !channelBtn) return;

    function show() {
      var n = channel + 1;
      title.textContent = I18N.t('tv.' + n + '.t');
      excerpt.textContent = I18N.t('tv.' + n + '.e');
      img.src = 'images/w800/' + IMAGES[channel] + '.webp';
      img.alt = title.textContent;
      img.style.display = title.style.display = excerpt.style.display = 'block';
      hint.style.display = 'none';
      title.classList.add('show');
      excerpt.classList.add('show');
    }

    function hide() {
      img.style.display = title.style.display = excerpt.style.display = 'none';
      title.classList.remove('show');
      excerpt.classList.remove('show');
      hint.style.display = '';
    }

    powerBtn.addEventListener('click', function () {
      isPowerOn = !isPowerOn;
      powerBtn.classList.toggle('on', isPowerOn);
      if (isPowerOn) show(); else hide();
    });

    channelBtn.addEventListener('click', function () {
      if (!isPowerOn) return;
      title.classList.remove('show');
      excerpt.classList.remove('show');
      img.style.display = 'none';
      screen.classList.add('static');
      setTimeout(function () {
        channel = (channel + 1) % IMAGES.length;
        show();
        screen.classList.remove('static');
      }, 500);
    });

    // keep the TV text in the selected language
    document.addEventListener('langchange', function () { if (isPowerOn) show(); });
  });
})();
