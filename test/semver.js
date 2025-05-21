function parse(v) {
  if (typeof v !== 'string') return {major:0, minor:0, patch:0};
  if (v[0] === 'v' || v[0] === 'V') v = v.slice(1);
  var parts = v.split('.');
  return {
    major: parseInt(parts[0], 10) || 0,
    minor: parseInt(parts[1], 10) || 0,
    patch: parseInt(parts[2], 10) || 0
  };
}
function cmp(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}
function satisfies(version, range) {
  var v = parse(version);
  var m = /^([<>]=?|=)?\s*(\d+)(?:\.(\d+))?/.exec(range.trim());
  if (!m) throw new Error('Unsupported range: ' + range);
  var op = m[1] || '=';
  var r = {major:+m[2], minor:m[3]?+m[3]:0, patch:0};
  var c = cmp(v, r);
  switch(op) {
    case '<': return c < 0;
    case '<=': return c <= 0;
    case '>': return c > 0;
    case '>=': return c >= 0;
    case '=': return c === 0;
    default: throw new Error('Unsupported operator: ' + op);
  }
}
module.exports = { satisfies };
