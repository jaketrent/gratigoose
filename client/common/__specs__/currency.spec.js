import test from 'ava'

import * as subject from '../currency'

test('handles nulls', t => {
  t.truthy(subject.stripDollarSign() === undefined)
})

test('handles no dollar sign', t => {
  t.truthy(subject.stripDollarSign('75.34') === '75.34')
})

test('strips positive dollar sign', t => {
  t.truthy(subject.stripDollarSign('$75.34') === '75.34')
})

test('strips negative dollar sign', t => {
  t.truthy(subject.stripDollarSign('-$75.34') === '-75.34')
})
