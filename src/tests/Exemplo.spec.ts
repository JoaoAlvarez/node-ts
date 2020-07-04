import User from '@models/User'

test('is shold be ok', () => {
  const user = new User()

  user.fistName = 'João'

  expect(user.fistName).toEqual('João')
})
