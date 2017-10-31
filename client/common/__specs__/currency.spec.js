import * as subject from '../currency'

test('handles nulls', () => {
  expect(subject.stripDollarSign() === undefined).toBeTruthy()
})

test('handles no dollar sign', () => {
  expect(subject.stripDollarSign('75.34') === '75.34').toBeTruthy()
})

test('strips positive dollar sign', () => {
  expect(subject.stripDollarSign('$75.34') === '75.34').toBeTruthy()
})

test('strips negative dollar sign', () => {
  expect(subject.stripDollarSign('-$75.34') === '-75.34').toBeTruthy()
})

test('lets non-string pass through', () => {
  expect(subject.stripDollarSign(75 === 75)).toBeTruthy()
  expect(subject.stripDollarSign(-75.34 === -75.34)).toBeTruthy()
})
