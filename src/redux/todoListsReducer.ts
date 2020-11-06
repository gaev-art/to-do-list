import {todoListsApi} from '../api/todoListsApi'
import {RequestStatusType, setAppStatusAC} from './appReducer'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterValuesType, TodoListDomainType} from '../utils/types'
import {handleServerNetworkError} from '../utils/errorUtils'


export const fetchTodoListsTC = createAsyncThunk(
  'todoLists/fetchTodoLists',
  async (param, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
      const todoLists = await todoListsApi.getTodoLists()
      thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
      return {todoLists}
    } catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  })
export const removeTodoListTC = createAsyncThunk(
  'todoLists/removeTodoList',
  async (todoListId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
      thunkAPI.dispatch(changeTodoListEntityStatusAC({todoListId, status: 'loading'}))
      await todoListsApi.deleteTodoList(todoListId)
      thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
      return {todoListId}
    } catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  })
export const addTodoListTC = createAsyncThunk(
  'todoLists/addTodoList',
  async (title: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
      const newTodoList = await todoListsApi.createTodoList(title)
      thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
      return {todoList: newTodoList.data.item}
    } catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  })
export const changeTodoListTitleTC = createAsyncThunk(
  'todoLists/changeTodoListTitle',
  async (param: { todoListId: string, title: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
      await todoListsApi.updateTitleTodoList(param.todoListId, param.title)
      thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
      return {todoListId: param.todoListId, title: param.title}
    } catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  })


const slice = createSlice({
  name: 'todoLists',
  initialState: [] as TodoListDomainType[],
  reducers: {
    changeTodoListFilterAC(state, action: PayloadAction<{ todoListId: string, filter: FilterValuesType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].filter = action.payload.filter
    },
    changeTodoListEntityStatusAC(state, action: PayloadAction<{ todoListId: string, status: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].entityStatus = action.payload.status
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
      return action.payload.todoLists.map(tl => ({...tl, filter: 'active', entityStatus: 'idle'}))
    })
    builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      if (index > -1) state.splice(index, 1)
    })
    builder.addCase(addTodoListTC.fulfilled, (state, action) => {
      state.unshift({...action.payload.todoList, filter: 'active', entityStatus: 'idle'})
    })
    builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].title = action.payload.title
    })
  }
})

export const todoListsReducer = slice.reducer
export const {changeTodoListFilterAC, changeTodoListEntityStatusAC} = slice.actions


