import {setAppErrorAC, setAppStatusAC} from './appReducer'
import {authApi,} from '../api/authApi'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

import {LoginParamsType} from '../utils/types'
import {handleServerNetworkError} from '../utils/errorUtils'


export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamsType, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const response = await authApi.login(param)
    if (response.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
    } else {
      if (response.resultCode === 10) {
        const response = await authApi.getCaptchaUrl()
        const captchaUrl = response.data.url
        thunkAPI.dispatch(getCaptchaUrlAC({captcha: captchaUrl}))
        return thunkAPI.rejectWithValue({})
      }
      thunkAPI.dispatch(setAppErrorAC({error: response.messages[0]}))
      thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
      return thunkAPI.rejectWithValue({})
    }
  } catch (error) {
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue({})
  }
})
export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    await authApi.logout()
    thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
  } catch (error) {
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue({})
  }
})


const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    captcha: ''
  },
  reducers: {
    setIsLoggedInAC: state => {
      state.isLoggedIn = true
    },
    getCaptchaUrlAC: (state, action: PayloadAction<{ captcha: string }>) => {
      state.captcha = action.payload.captcha
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, state => {
      state.isLoggedIn = true
    })
    builder.addCase(logoutTC.fulfilled, state => {
      state.isLoggedIn = false
    })
  }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC, getCaptchaUrlAC} = slice.actions



