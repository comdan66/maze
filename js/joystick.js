/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */


$(function () {
  var hash = window.location.hash.substring (1);
  if (hash.length <= 0) return window.location.assign ('http://' + window.DOMAIN + '/maze/');

  var $loading = $('#loading').contextmenu (function () { return false; });

  function up () { if (x !== null && y !== null && _u (x, y) == 1) firebase.database ().ref ('u/' + hash + '/l').set ([x - 1, y]); }
  function le () { if (x !== null && y !== null && _l (x, y) == 1) firebase.database ().ref ('u/' + hash + '/l').set ([x, y - 1]); }
  function ri () { if (x !== null && y !== null && _r (x, y) == 1) firebase.database ().ref ('u/' + hash + '/l').set ([x, y + 1]); }
  function bo () { if (x !== null && y !== null && _d (x, y) == 1) firebase.database ().ref ('u/' + hash + '/l').set ([x + 1, y]); }

  var x = null, y = null, r = null, e = null;

  firebase.initializeApp (config);
  e = firebase.database ().ref ('u/' + hash + '/e');
  r = firebase.database ().ref ('u/' + hash + '/l');

  e.once ('value', function (s) {
    if (s.val () != 0) return window.location.assign ('http://' + window.DOMAIN + '/maze/');
    
    e.set (1, function () {
      r.on ('value', function (s) { if (!(s.val () && s.val ().length == 2 && typeof s.val ()[0] != 'undefined' && typeof s.val ()[1] != 'undefined' && !isNaN (s.val ()[0]) & !isNaN (s.val ()[1]) && s.val ()[0] >= 0 && s.val ()[1] >= 0)) return window.location.assign ('http://' + window.DOMAIN + '/maze/'); x = s.val ()[0]; y = s.val ()[1]; });

      var n = window.prompt ('請輸入暱稱：'); if (!n.length) n = '遊客';

      firebase.database ().ref ('u/' + hash + '/n').set (n, function () {
        e.set (2, function () {
          e.on ('value', function (s) {
            if (s.val () !== 3) return;

            r.off ();
            e.off ();
            var $gg = $('<div />').attr ('id', 'gg').append ($('<div />').append ($('<span />').text ('歐不..你被吃掉惹..ＧＧ')).append ($('<div />').append ($('<a />').text ('如何實作的').click (function () { window.open ('https://github.com/comdan66/maze', '_blank'); })).append ($('<a />').text ('分享到臉書').click (function () { window.open ('https://www.facebook.com/sharer/sharer.php?u=http://' + window.DOMAIN + '/maze/', '分享', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=' + (window.screen ? Math.round (screen.width / 2 - 275) : 100)); })))).appendTo ($('body'));
            setTimeout (function () {
              $gg.addClass ('s');
            }, 500);
          });

          $loading.removeClass ('s');
          setTimeout (function () { $loading.remove (); }, 500);
        });
      });
    });
  });

  $('#up').click (up);
  $('#left').click (le);
  $('#right').click (ri);
  $('#down').click (bo);
  $(window).keyup (function (e) { switch (e.keyCode) { case 38: up (); break; case 40: bo (); break; case 37: le (); break; case 39: ri (); break; } });
});