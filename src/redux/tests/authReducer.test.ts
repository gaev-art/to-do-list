import {authReducer, setIsLoggedInAC} from '../authReducer'

let startState: {
  isLoggedIn: boolean
  captcha: string
}
beforeEach(() => {
  startState = {
    isLoggedIn: false,
    captcha: ''
  }
})


test('isLoggedIn', () => {

  const endState = authReducer(startState, setIsLoggedInAC())

  expect(endState.isLoggedIn).toBe(true)
})