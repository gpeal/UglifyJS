function parse(version) {
  if (typeof version !== 'string') version = String(version);
  var m = version.trim().match(/v?(\d+)\.(\d+)\.(\d+)/);
  if (!m) return [0,0,0];
  return [parseInt(m[1],10), parseInt(m[2],10), parseInt(m[3],10)];
}

function compare(a, b) {
  for (var i = 0; i < 3; i++) {
    if (a[i] > b[i]) return 1;
    if (a[i] < b[i]) return -1;
  }
  return 0;
}

exports.satisfies = function(version, range) {
  var v = parse(version);
  range = String(range).trim();
  var m = range.match(/^(<=|>=|<|>|=)?\s*(.*)$/);
  var op = m[1] || '=';
  var r = parse(m[2]);
  var cmp = compare(v, r);
  switch (op) {
    case '<': return cmp < 0;
    case '<=': return cmp <= 0;
    case '>': return cmp > 0;
    case '>=': return cmp >= 0;
    case '=': return cmp === 0;
    default: return false;
  }
};
