const semafor = require('./semafor')

test('error: invalid syntax', () => {
  expect(() => semafor('x')).toThrow('Syntax error')
  expect(() => semafor(' ')).toThrow('Syntax error')
  expect(() => semafor('0 ')).toThrow('Syntax error')
  expect(() => semafor(' 0')).toThrow('Syntax error')
  expect(() => semafor(' 0 ')).toThrow('Syntax error')
  expect(() => semafor('00')).toThrow('Syntax error')
  expect(() => semafor('+00')).toThrow('Syntax error')
  expect(() => semafor('00+')).toThrow('Syntax error')
  expect(() => semafor('+00+')).toThrow('Syntax error')
  expect(() => semafor('00+00')).toThrow('Syntax error')
  expect(() => semafor('+00+00')).toThrow('Syntax error')
  expect(() => semafor('00+00+')).toThrow('Syntax error')
  expect(() => semafor('+00+00+')).toThrow('Syntax error')
  expect(() => semafor('x')).toThrow('Syntax error')
  expect(() => semafor('0x')).toThrow('Syntax error')
  expect(() => semafor('x0')).toThrow('Syntax error')
  expect(() => semafor('0x0')).toThrow('Syntax error')
  expect(() => semafor('x+')).toThrow('Syntax error')
  expect(() => semafor('+x+')).toThrow('Syntax error')
  expect(() => semafor('1x1')).toThrow('Syntax error')
  expect(() => semafor('x1')).toThrow('Syntax error')
  expect(() => semafor('1x')).toThrow('Syntax error')
  expect(() => semafor('1x+')).toThrow('Syntax error')
  expect(() => semafor('+x1')).toThrow('Syntax error')
  expect(() => semafor('0x+')).toThrow('Syntax error')
  expect(() => semafor('+x0')).toThrow('Syntax error')
  expect(() => semafor('00')).toThrow('Syntax error')
  expect(() => semafor('01')).toThrow('Syntax error')
  expect(() => semafor('010')).toThrow('Syntax error')
  expect(() => semafor('012')).toThrow('Syntax error')
  expect(() => semafor('+00')).toThrow('Syntax error')
  expect(() => semafor('+01')).toThrow('Syntax error')
  expect(() => semafor('00+')).toThrow('Syntax error')
  expect(() => semafor('01+')).toThrow('Syntax error')
  expect(() => semafor('+00+')).toThrow('Syntax error')
  expect(() => semafor('+01+')).toThrow('Syntax error')
  expect(() => semafor('+00+')).toThrow('Syntax error')
  expect(() => semafor('+01+')).toThrow('Syntax error')
  expect(() => semafor('0+00+')).toThrow('Syntax error')
  expect(() => semafor('0+01+')).toThrow('Syntax error')
  expect(() => semafor('0+00+0')).toThrow('Syntax error')
  expect(() => semafor('0+01+0')).toThrow('Syntax error')
  expect(() => semafor('00+1')).toThrow('Syntax error')
  expect(() => semafor('01+1')).toThrow('Syntax error')
  expect(() => semafor('+00+1')).toThrow('Syntax error')
  expect(() => semafor('+01+1')).toThrow('Syntax error')
  expect(() => semafor('1+00')).toThrow('Syntax error')
  expect(() => semafor('1+01')).toThrow('Syntax error')
  expect(() => semafor('0+00')).toThrow('Syntax error')
  expect(() => semafor('0+01')).toThrow('Syntax error')
  expect(() => semafor('0++00')).toThrow('Syntax error')
  expect(() => semafor('0++01')).toThrow('Syntax error')
  expect(() => semafor('0+++00')).toThrow('Syntax error')
  expect(() => semafor('0+++01')).toThrow('Syntax error')
  expect(() => semafor('0+++00+')).toThrow('Syntax error')
  expect(() => semafor('0+++01+')).toThrow('Syntax error')
  expect(() => semafor('0+++00++')).toThrow('Syntax error')
  expect(() => semafor('0+++01++')).toThrow('Syntax error')
  expect(() => semafor('+0+++00++')).toThrow('Syntax error')
  expect(() => semafor('+0+++01++')).toThrow('Syntax error')
})

test('empty program', () => {
  expect(semafor('')).toStrictEqual([0, 0, 0])
})

test('increment', () => {
  expect(semafor('+')).toStrictEqual([1, 0, 0])
  expect(semafor('++')).toStrictEqual([2, 0, 0])
  expect(semafor('+++')).toStrictEqual([3, 0, 0])
})

test('decrement', () => {
  expect(semafor('%+', [1, 0, 0])).toStrictEqual([0, 0, 0])
  expect(semafor('%+', [2, 0, 0])).toStrictEqual([1, 0, 0])
  expect(semafor('%++', [2, 0, 0])).toStrictEqual([0, 0, 0])
  expect(semafor('%+++', [2, 0, 0])).toStrictEqual([0, 0, 0])
})

test('infinite loop', () => {
    expect(() => semafor('0', null, 100)).toThrow('Maximal steps exceeded')
    expect(() => semafor('1', null, 100)).toThrow('Maximal steps exceeded')
    expect(() => semafor('2', null, 100)).toThrow('Maximal steps exceeded')
    expect(() => semafor('!1', null, 100)).toThrow('Maximal steps exceeded')
    expect(() => semafor('!2', null, 100)).toThrow('Maximal steps exceeded')
})

test('simple loop', () => {
    expect(semafor('!!%%!9%+%!+!%10%', [42, 0, 0])).toStrictEqual([0, 42, 0])
    expect(semafor('!!%%!9%+%!+!%10!!+', [42, 13, 0])).toStrictEqual([0, 55, 1])
    expect(semafor('+++!!%%!9%+%!+!%10%')).toStrictEqual([0, 3, 0])
})

test('addition', () => { // A = A + B
  const add = '!!%%!!9%+!%+%!11%'
  expect(semafor(add, [0, 0, 0])).toStrictEqual([0, 0, 0])
  expect(semafor(add, [1, 0, 0])).toStrictEqual([1, 0, 0])
  expect(semafor(add, [42, 0, 0])).toStrictEqual([42, 0, 0])
  expect(semafor(add, [0, 1, 0])).toStrictEqual([1, 0, 0])
  expect(semafor(add, [0, 42, 0])).toStrictEqual([42, 0, 0])
  expect(semafor(add, [1, 1, 0])).toStrictEqual([2, 0, 0])
  expect(semafor(add, [42, 13, 0])).toStrictEqual([55, 0, 0])
  expect(semafor(add, [13, 42, 0])).toStrictEqual([55, 0, 0])
})

test('Hello World', () => {
  const hello = cleanup(`
    ++++     %!!!%7%+%!%8
    +++      %!!!%7%+%!%8
    +++++    %!!!%7%+%!%8
    +++++    %!!!%7%+%!%8
    ++++++   %!!!%7%+%!%8
    +        %!!!%7%+%!%8
    ++++++++ %!!!%7%+%!%8
    ++++++   %!!!%7%+%!%8
    +++++++  %!!!%7%+%!%8
    +++++    %!!!%7%+%!%8
    ++       %!!!%7%+%!%8
    %
  `)
  const result = []
  semafor(hello, null, null, collectChanges(result))

  const alphabet = []
  alphabet[1] = ' '
  alphabet[2] = 'd'
  alphabet[3] = 'e'
  alphabet[4] = 'H'
  alphabet[5] = 'l'
  alphabet[6] = 'o'
  alphabet[7] = 'r'
  alphabet[8] = 'W'

  let msg = ''
  for (let i = 0; i < result.length; i++) {
      msg += alphabet[result[i]]
  }

  expect(msg).toStrictEqual('Hello World')
})

function collectChanges(result) {
  let last = 0, zero = true
  return  r => {
    if (r[0] < last && zero) {  // value change
      result.push(last)
      zero = false
    }
    last = r[0]
    if (last === 0) zero = true
  }
}

function cleanup(p) {
  return p.replaceAll(/[^%!+\d]/g, '')
}