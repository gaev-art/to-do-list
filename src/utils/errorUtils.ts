import {Dispatch} from 'redux'
import {ResponseType} from './types'
import {setAppErrorAC, setAppStatusAC} from '../redux/appReducer'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<any>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({error: data.messages[0]}))
  } else {
    dispatch(setAppErrorAC({error: 'Some error occurred'}))
  }
  dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<any>) => {
  dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
  dispatch(setAppStatusAC({status: 'failed'}))
}
