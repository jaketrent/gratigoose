import * as subject from '../utils'

test('#create defaults to success level', () => {
  const title = 'some msg'
  const actual = subject.create(title)
  expect(typeof actual.id === 'string').toBeTruthy()
  expect(actual.title === title).toBeTruthy()
  expect(actual.level === subject.levels.SUCCESS).toBeTruthy()
})

test('#create allows setting level', () => {
  const title = 'some msg'
  const level = subject.levels.ERROR
  const actual = subject.create(title, level)
  expect(actual.level === level).toBeTruthy()
})

test('#createSuccess uses success level', () => {
  const actual = subject.createSuccess('some title')
  expect(actual.level === subject.levels.SUCCESS).toBeTruthy()
})

test('#createSuccess uses error level', () => {
  const actual = subject.createError('some title')
  expect(actual.level === subject.levels.ERROR).toBeTruthy()
})

test('#createFromErrors transfers error attrs to alert attrs', () => {
  const errs = [
    {
      id: 'theId',
      title: 'the title',
      status: 500
    }
  ]
  expect(subject.createFromErrors(errs)).toEqual([
    {
      id: errs[0].id,
      title: errs[0].title,
      level: subject.levels.ERROR
    }
  ])
})
