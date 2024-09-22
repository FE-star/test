function add(a, b) {
  return a + b;
}

function addFloat(a, b) {
  const scale = 1000000;
  return (a * scale + b * scale) / scale;
}

QUnit.test('test add()', function (assert) {
  assert.equal(add(1, 2), 3, 'add(1, 2) = 3');
});

QUnit.test('test addFloat()', function (assert) {
  assert.equal(addFloat(0.1, 0.2), 0.3, 'addFloat(0.1, 0.2) = 0.3');
});

// QUnit.test('test add() for float', function (assert) {
//   assert.equal(add(.1, .2), .3, 'add(.1, .2) = .3');
// });
