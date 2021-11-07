const assert = require('assert')
const Asearch = require('../')
const { cliMain } = require('../cliMain')

describe('pattern "abcde"', function () {

  const match = Asearch('abcde')

  it('should have property "source"', function () {
    assert.equal(match.source, 'abcde')
  })

  it('should match "abcde"', function () {
    assert.equal(match('abcde'), true)
  })

  it('should match "aBCDe"', function () {
    assert.equal(match('aBCDe'), true)
  })

  it('should match ("abXcde",1)', function () {
    assert.equal(match('abXcde',1), true)
  })

  it('should match ("ab?de",1)', function () {
    assert.equal(match('ab?de',1), true)
  })

  it('should match ("abde",1)', function () {
    assert.equal(match('abde',1), true)
  })

  it('should match (abXXde,2)', function () {
    assert.equal(match('abXXde',2), true)
  })

  it('should not match "abXcde"', function () {
    assert.equal(match('abXcde'), false)
  })

  it('should not match "ab?de"', function () {
    assert.equal(match('ab?de'), false)
  })

  it('should not match "abde"', function () {
    assert.equal(match('abde'), false)
  })

  it('should not match ("abXXde",1)', function () {
    assert.equal(match('abXXde',1), false)
  })
})

describe('pattern "ab de"', function () {

  const match = Asearch('ab de')

  it('should match ("abcde")', function (){
    assert.equal(match('abcde'), true)
  })

  it('should match ("abccde")', function () {
    assert.equal(match('abccde'), true)
  })

  it('should match ("abXXXXXXXde")', function () {
    assert.equal(match('abXXXXXXXde'), true)
  })

  it('should match ("abcccccxe",1)', function () {
    assert.equal(match('abcccccxe',1), true)
  })

  it('should not match "abcccccxe"', function () {
    assert.equal(match('abcccccxe'), false)
  })
})


describe('pattern "abcde"', function () {

  const match = Asearch('abcde')

  it('should match "abcde"', function () {
    assert.equal(match('abcde'), true)
  })

  it('should match ("abcde",1)', function () {
    assert.equal(match('abcde',1), true)
  })

  it('should not match "abcd"', function () {
    assert.equal(match('abcd'), false)
  })

  it('should match ("abcd",1)', function () {
    assert.equal(match('abcd',1), true)
  })
})

describe('pattern "漢字文字列"', function () {

  const match = Asearch('漢字文字列')

  it('should match "漢字文字列"', function () {
    assert.equal(match('漢字文字列'), true)
  })

  it('should not match "漢字の文字列"', function () {
    assert.equal(match('漢字の文字列'), false)
  })

  it('should match "漢字の文字列"', function () {
    assert.equal(match('漢字の文字列', 1), true)
  })

  it('should not match "漢字文字"', function () {
    assert.equal(match('漢字文字'), false)
  })

  it('should match ("漢字文字", 1)', function () {
    assert.equal(match('漢字文字', 1), true)
  })

  it('should not match "漢字文字烈"', function () {
    assert.equal(match("漢字文字烈"), false)
  })

  it('should match ("漢字文字烈", 1)', function () {
    assert.equal(match("漢字文字烈", 1), true)
  })

  it('should not match ("漢和辞典", 2)', function () {
    assert.equal(match("漢和辞典", 2), false)
  })
})

describe('pattern "👀😀💨"', function () {

  const match = Asearch('👀😀💨')

  it('should match "👀😀💨"', function () {
    assert.equal(match('👀😀💨'), true)
  })

  it('should not match "👀😀𝟘"', function () {
    assert.equal(match('👀😀𝟘'), false)
  })

  it('should match ("👀😀𝟘", 1)', function () {
    assert.equal(match("👀😀𝟘", 1), true)
  })
})

describe('cli with pattern "abcde"', function () {
  it('should match "abcde"', function () {
    assert.equal(cliMain(['node', 'cli.js', 'abcde', 'abcde']), 0)
  })

  it('should match ("abXcde",1)', function () {
    assert.equal(cliMain(['node', 'cli.js', 'abcde', 'abXcde', '1']), 0)
  })

  it('should not match "abXcde"', function () {
    assert.equal(cliMain(['node', 'cli.js', 'abcde', 'abXcde']), 1)
  })

  it('should return the argument error', function () {
    assert.equal(cliMain(['node', 'cli.js', 'abcde']), 2)
    assert.equal(cliMain(['node', 'cli.js', 'abcde', 'abcde', '-1']), 2)
    assert.equal(cliMain(['node', 'cli.js', 'abcde', 'abcde', '4']), 2)
  })
})
