import test from 'ava'

import * as subject from '../utils'

test('#create defaults to success level', t => {
  const title = 'some msg'
  const actual = subject.create(title)
  t.truthy(typeof actual.id === 'string')
  t.truthy(actual.title === title)
  t.truthy(actual.level === subject.levels.SUCCESS)
})

test('#create allows setting level', t => {
  const title = 'some msg'
  const level = subject.levels.ERROR
  const actual = subject.create(title, level)
  t.truthy(actual.level === level)
})

test('#createSuccess uses success level', t => {
  const actual = subject.createSuccess('some title')
  t.truthy(actual.level === subject.levels.SUCCESS)
})

test('#createSuccess uses error level', t => {
  const actual = subject.createError('some title')
  t.truthy(actual.level === subject.levels.ERROR)
})

test('#createFromErrors transfers error attrs to alert attrs', t => {
  const errs = [{
    id: 'theId',
    title: 'the title',
    status: 500
  }]
  t.deepEqual(subject.createFromErrors(errs), [{
    id: errs[0].id,
    title: errs[0].title,
    level: subject.levels.ERROR
  }])
})
