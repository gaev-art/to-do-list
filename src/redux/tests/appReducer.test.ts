import {appReducer, isInitializeAppTC, RequestStatusType, setAppErrorAC, setAppStatusAC} from '../appReducer'

let startState: {
  status: RequestStatusType,
  error: string | null,
  isInitialized: boolean
}

beforeEach(() => {
  startState = {
    error: null,
    status: 'idle',
    isInitialized: false
  }
})


test('correct error message should be set', () => {

  const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))

  expect(endState.error).toBe('some error')
})

test('correct status message should be set', () => {

  const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))

  expect(endState.status).toBe('loading')
})
test('correct isInitialized should be set', () => {

  const endState = appReducer(startState, isInitializeAppTC.fulfilled(undefined,''))

  expect(endState.isInitialized).toBe(true)
})