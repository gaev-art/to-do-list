import {authApi} from '../api/authApi'
import {setIsLoggedInAC} from './authReducer'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'


export const isInitializeAppTC = createAsyncThunk('app/isInitializeApp', async (param, thunkAPI) => {
  const response = await authApi.me()
  if (response.resultCode === 0) {
    thunkAPI.dispatch(setIsLoggedInAC())
  }
})


const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
  },
  reducers: {
    setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    }
  },
  extraReducers: builder => {
    builder.addCase(isInitializeAppTC.fulfilled, state => {
      state.isInitialized = true
    })
  }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC} = slice.actions


export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
