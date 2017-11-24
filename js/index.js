/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {
  firebase.initializeApp (config);
  
  window.maze=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0],[0,0,0,1,0,0,0,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,0],[0,1,1,1,1,1,1,0,1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,1,0,1,0],[0,1,0,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,1,0],[0,1,1,1,1,1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0],[0,1,0,0,0,0,1,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0],[0,1,0,1,1,0,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0],[0,1,0,1,0,0,1,0,1,0,0,0,0,1,0,0,1,1,1,1,1,0,1,0,1,1,0,0,1,0],[0,1,0,1,0,0,1,0,1,1,1,1,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0],[0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0],[0,1,0,0,1,0,0,0,1,1,1,1,1,1,0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,0],[0,1,1,1,1,0,1,0,1,0,0,0,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0],[0,0,1,0,0,0,1,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,0,1,1,1,0,1,0],[0,1,1,0,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,0,1,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,1,0,1,0,1,0],[0,1,0,1,1,0,1,0,1,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,1,0,1,1,1,0],[0,1,0,1,0,0,1,0,1,0,1,1,1,1,0,0,0,1,0,0,1,0,1,1,1,0,1,0,1,0],[0,1,1,1,0,1,1,0,1,0,0,0,0,1,0,1,0,1,0,0,1,1,1,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,1,1,1,1,1,0],[0,1,1,1,1,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,1,1,1,1,1,0,0,0,0,0],[0,0,1,0,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,0,0,0,1,0,1,1,1,0],[0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,1,1,1,1,0,1,0],[0,1,1,1,1,0,0,1,0,0,1,0,0,0,0,1,0,1,0,1,1,0,1,0,0,0,0,0,1,0],[0,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],];

  function point (i, j) { return typeof window.maze[i] == 'undefined' || typeof window.maze[i][j] == 'undefined' ? null : window.maze[i][j]; }
  function point_up (i, j) { return point (i - 1, j); }
  function point_bottom (i, j) { return point (i + 1, j); }
  function point_right (i, j) { return point (i, j + 1); }
  function point_left (i, j) { return point (i, j - 1); }
  function point_up_right (i, j) { return point (i - 1, j + 1); }
  function point_up_left (i, j) { return point (i - 1, j - 1); }
  function point_bottom_right (i, j) { return point (i + 1, j + 1); }
  function point_bottom_left (i, j) { return point (i + 1, j - 1); }
  function point_radius (i, j) { var c = []; c.push (point (i, j) === 1 ? 'road' : 'wall'); if (point_up (i, j) == 1 && point_up_right (i, j) == 1 && point_right (i, j) == 1) c.push ('up_right'); if (point_bottom (i, j) == 1 && point_bottom_right (i, j) == 1 && point_right (i, j) == 1) c.push ('bottom_right'); if (point_up (i, j) == 1 && point_up_left (i, j) == 1 && point_left (i, j) == 1) c.push ('up_left'); if (point_bottom (i, j) == 1 && point_bottom_left (i, j) == 1 && point_left (i, j) == 1) c.push ('bottom_left'); return c.join (' '); }

  var px = 25, _u = {}, _k = null, x = null, y = null, z = null, row = window.maze.length, col = window.maze[0].length;

  var _a = firebase.database ().ref ('u').orderByChild ('e').equalTo (1);
  var _b = firebase.database ().ref ('u').orderByChild ('e').equalTo (0);
  var empty = [];
  var $loading = $('#loading').contextmenu (function () { return false; });
  var $cover = $('#cover > div');
  var $maps = $('#maps').css ({'width': col * px + 'px', 'height': row * px + 'px'});
  for (var i = 0; i < row; i++)
    for (var j = 0; j < col; j++) {
      $maps.append ($('<div />').addClass ('p').addClass (point_radius (i, j)).css ({ width: px + 'px', height: px + 'px', 'line-height': px + 'px' }));
      if (window.maze[i][j] == 1) empty.push ([i, j]);
    }
  
  _k = firebase.database ().ref ('u').push ({
    e: 1,
    s: 10,//parseInt (Math.random () * 50, 10) % 5 + 1,
    l: empty[Math.floor (Math.random () * empty.length)]
  }, function () {
    for (i = 0; i < 3; i++) firebase.database ().ref ('u').push ({ e: 1, s: 0, l: empty[Math.floor (Math.random () * empty.length)] });

    _a.on ('child_added', function (s) {
      _u[s.getKey ()] = {
        i: s.getKey (),
        s: s.val ().s,
        l: s.val ().l,
        a: typeof s.val ().a != 'undefined',
        $u: $('<div />').css ({ width: px + 'px', height: px + 'px', 'line-height': (px - 1) + 'px' }).addClass ('u').addClass (typeof s.val ().a == 'undefined' ? s.val ().s !== 0 ? _k == s.getKey () ? 'me' : 'he' : 'fo' : 'st').appendTo ($maps),
        r: {
          l: firebase.database ().ref ('u/' + s.getKey () + '/l'),
          s: firebase.database ().ref ('u/' + s.getKey () + '/s'),
          e: firebase.database ().ref ('u/' + s.getKey () + '/e'),
        }
      };
        
      if (typeof _u[s.getKey ()] != 'undefined') _u[s.getKey ()].r.l.on ('value', function (s3) { run (s.getKey (), s3); });
      if (typeof _u[s.getKey ()] != 'undefined') _u[s.getKey ()].r.s.on ('value', function (s3) { score (s.getKey (), s3); });
    });

    _b.on ('child_added', function (s) { rmu (s.getKey ()); });
    
    $loading.removeClass ('s');
    setTimeout (function () { $loading.remove (); }, 500);
  }).key;

  function run (i, s) {
    if (typeof _u[i] == 'undefined' || s.val () === null || point (s.val ()[0], s.val ()[1]) === null || point (s.val ()[0], s.val ()[1]) === 0)
      return i == _k ? location.reload () : false;
    
    if (_u[i].a) {
      window.maze[_u[i].l[0]][_u[i].l[1]] = i;
      _u[i].$u.css ({ top: (_u[i].l[0] * px) + 'px', left: (_u[i].l[1] * px) + 'px' });
      setTimeout (function () {
        _u[i].r.e.set (0);
      }, 10000);
      return;
    }

    if (typeof _u[point (s.val ()[0], s.val ()[1])] !== 'undefined') {

      var he = _u[point (s.val ()[0], s.val ()[1])];

      if (he.a) {
        return;
      }

      if (he.s > _u[i].s) return _u[i].r.e.set (0, function () { he.r.s.set (he.s + 1); });
      he.r.e.set (0, function () { _u[i].r.s.set (_u[i].s + 1); });
      firebase.database ().ref ('u').push ({ e: 1, s: 0, l: empty[Math.floor (Math.random () * empty.length)] });
    }

    window.maze[_u[i].l[0]][_u[i].l[1]] = window.maze[_u[i].l[0]][_u[i].l[1]] === i ? 1 : window.maze[_u[i].l[0]][_u[i].l[1]];
    _u[i].l = s.val ();
    window.maze[_u[i].l[0]][_u[i].l[1]] = i;
    
    _u[i].$u.css ({ top: (_u[i].l[0] * px) + 'px', left: (_u[i].l[1] * px) + 'px' });

    if (i !== _k) return;
    x =_u[i].l[0];
    y =_u[i].l[1];
    $maps.css ({ top: 'calc(50% - ' + (_u[i].l[0] * px) + 'px - ' + px + 'px / 2)', left: 'calc(50% - ' + (_u[i].l[1] * px) + 'px - ' + px + 'px / 2)' });
  }

  function score (i, s) {
    if (typeof _u[i] == 'undefined' || isNaN (s.val ()) || s.val () <= 0)
      return i == _k ? location.reload () : false;
    
    _u[i].s = s.val ();
    _u[i].$u.addClass (s.val ().s !== 0 ? _k == i ? 'me' : 'he' : 'fo').text (_u[i].s);
    if (_u[i].s > 10 && _u[i].s < 21) _u[i].$u.attr ('data-s', 's1');
    if (_u[i].s > 20 && _u[i].s < 31) _u[i].$u.attr ('data-s', 's2');
    if (_u[i].s > 30 && _u[i].s < 41) _u[i].$u.attr ('data-s', 's3');
    if (_u[i].s > 40) _u[i].$u.attr ('data-s', 's4');
    
    if (i !== _k) return;
    
    if (_u[i].s > 10 && _u[i].s < 21) $cover.addClass ('s1');
    if (_u[i].s > 20 && _u[i].s < 31) $cover.addClass ('s2');
    if (_u[i].s > 30 && _u[i].s < 41) $cover.addClass ('s3');
    if (_u[i].s > 40) $cover.addClass ('s4');
    _s = _u[i].s;
  }
  function rmu (i) {
    if (typeof _u[i] == 'undefined') return;
    _u[i].r.l.off ();
    _u[i].r.s.off ();
    _u[i].r.e.off ();
    _u[i].$u.remove ();

    _u[i] = null;
    delete _u[i];

    if (i != _k) return;
    gg ();
  }
  function gg () {
    _a.off ();
    _b.off ();
    var $gg = $('<div />').attr ('id', 'gg').append ($('<div />').append ($('<span />').text ('歐不..你被吃掉惹..ＧＧ')).append ($('<div />').append ($('<a />').text ('如何實作的').click (function () { window.open ('https://github.com/comdan66/maze', '_blank'); })).append ($('<a />').text ('分享到臉書').click (function () { window.open ('https://www.facebook.com/sharer/sharer.php?u=http://' + window.DOMAIN + '/maze/', '分享', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=' + (window.screen ? Math.round (screen.width / 2 - 275) : 100)); })))).appendTo ($('body'));
    setTimeout (function () { $gg.addClass ('s'); }, 500);
  }
  function move (x, y) {
    if (_m) return;
    _m = true;
      firebase.database ().ref ('u/' + _k + '/l').set ([x, y], function () {
        _m = false;
      });
  }
  function put_point (x, y) {
    if (typeof _u[_k] == 'undefined') return;
    // _u[_k].r.s.set (_s - 5, function () {
      firebase.database ().ref ('u').push ({ e: 1, s: 0, l: [x, y], a: true});
    // });
  }
  function up () { if (x !== null && y !== null && point_up (x, y) !== 0) move (x - 1, y); }
  function left () { if (x !== null && y !== null && point_left (x, y) !== 0) move (x, y - 1); }
  function right () { if (x !== null && y !== null && point_right (x, y) !== 0) move (x, y + 1); }
  function bottom () { if (x !== null && y !== null && point_bottom (x, y) !== 0) move (x + 1, y); }
  function put () { if (x !== null && y !== null && point (x, y) === _k) put_point (x, y); }
  var _m = false;
  $(window).keydown (function (e) {
    switch (e.keyCode) {
      case 38: up (); break;
      case 40: bottom (); break;
      case 37: left (); break;
      case 39: right (); break;
      case 32: put (); break;
    }

    
  });
});