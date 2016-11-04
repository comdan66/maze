/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {
  var k = location.search.substring (1);
  if (!k.match (/^k=/)) return window.location.assign ('http://' + window.DOMAIN + '/maze/');
  var hash = k.substring (2);
  if (hash.length <= 0) return window.location.assign ('http://' + window.DOMAIN + '/maze/');

  var $loading = $('#loading').contextmenu (function () { return false; });

  firebase.initializeApp (config);
  var e = firebase.database ().ref ('u/' + hash + '/e');
  var u = firebase.database ().ref ('u').orderByChild ('e').equalTo (2);
  var px = 25, row = window.maze.length, col = window.maze[0].length;
  var $maps = null, _u = {};

  e.once ('value', function (s) {
    if (s.val () === null || (s.val () !== 1 && s.val () !== 2 && s.val () !== 3)) window.location.assign ('http://' + window.DOMAIN + '/maze/');

    e.on ('value', function (s1) {
      if (s1.val () === 3) {
        gg ();
      }
      if (s1.val () === 2) {
        $maps = $('#maps').css ({'width': col * px + 'px', 'height': row * px + 'px'});
        for (var i = 0; i < row; i++) for (var j = 0; j < col; j++) $maps.append ($('<div />').addClass ('p').addClass (!window.maze[i][j] ? 'wall' : 'road').addClass (_rs (i, j)).css ({ width: px + 'px', height: px + 'px', 'line-height': px + 'px' }));

        u.on ('child_added', function (s2) {
          _u[s2.getKey ()] = $.extend (s2.val (), {i: s2.getKey (), $u: $('<div />').css ({ width: px + 'px', height: px + 'px', 'line-height': (px - 1) + 'px' }).addClass ('u').addClass (hash == s2.getKey () ? 'me' : 'he').appendTo ($maps),
            r: {
              l: firebase.database ().ref ('u/' + s2.getKey () + '/l'),
              s: firebase.database ().ref ('u/' + s2.getKey () + '/s'),
              e: firebase.database ().ref ('u/' + s2.getKey () + '/e'),
            }});

          _u[s2.getKey ()].r.l.on ('value', function (s3) { run (s2.getKey (), s3); });
          _u[s2.getKey ()].r.s.on ('value', function (s3) { score (s2.getKey (), s3); });
          _u[s2.getKey ()].r.e.on ('value', function (s3) { if (s3.val () === 3) rmu (s2.getKey ()); });
        });

        $loading.removeClass ('s');
        setTimeout (function () { $loading.remove (); }, 500);
      }
    });
  });

  function run (i, s) {
    if (typeof _u[i] == 'undefined') return;
    if (_e (s.val ()[0], s.val ()[1]) === null || _e (s.val ()[0], s.val ()[1]) === 0) return;

    if (typeof _u[_e (s.val ()[0], s.val ()[1])] !== 'undefined') {
      var he = _u[_e (s.val ()[0], s.val ()[1])];

      if (he.s < _u[i].s) {
        firebase.database ().ref ('u/' + i + '/s').set (_u[i].s + 1);
        firebase.database ().ref ('u/' + he.i + '/e').set (3);
        rmu (he.i);
      }
      if (he.s > _u[i].s) {
        firebase.database ().ref ('u/' + he.i + '/s').set (he.s + 1);
        firebase.database ().ref ('u/' + i + '/e').set (3);
        rmu (i);
        return;
      }
    }

    window.maze[_u[i].l[0]][_u[i].l[1]] = 1;
    _u[i].l = s.val ();
    window.maze[_u[i].l[0]][_u[i].l[1]] = i;
    _u[i].$u.css ({ top: (_u[i].l[0] * px) + 'px', left: (_u[i].l[1] * px) + 'px' });

    if (i !== hash) return;
    $maps.css ({ top: 'calc(50% - ' + (_u[i].l[0] * px) + 'px - ' + px + 'px / 2)', left: 'calc(50% - ' + (_u[i].l[1] * px) + 'px - ' + px + 'px / 2)' });
  }

  function gg () {
    e.off (); u.off ();
    var $gg = $('<div />').attr ('id', 'gg').append ($('<div />').append ($('<span />').text ('歐不..你被吃掉惹..ＧＧ')).append ($('<div />').append ($('<a />').text ('如何實作的').click (function () { window.open ('https://github.com/comdan66/maze', '_blank'); })).append ($('<a />').text ('分享到臉書').click (function () { window.open ('https://www.facebook.com/sharer/sharer.php?u=http://' + window.DOMAIN + '/maze/', '分享', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=' + (window.screen ? Math.round (screen.width / 2 - 275) : 100)); })))).appendTo ($('body'));
    setTimeout (function () { $gg.addClass ('s'); }, 500);
  }
  function rmu (i) {
    if (typeof _u[i] == 'undefined') return;
    _u[i].r.l.off ();
    _u[i].r.s.off ();
    _u[i].r.e.off ();
    _u[i].$u.remove ();
    _u[i] = null; delete _u[i];

    if (i != hash) return;
    gg ();
  }

  function score (i, s) {
    if (typeof _u[i] == 'undefined' || isNaN (s.val ()) || s.val () <= 0) return;
    _u[i].s = s.val ();
    _u[i].$u.text (_u[i].s);
  }
});