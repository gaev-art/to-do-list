import {AppRootStateType} from './store'
import {setAppErrorAC, setAppStatusAC,} from './appReducer'
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {addTodoListTC, fetchTodoListsTC, removeTodoListTC} from './todoListsReducer'
import {tasksApi} from '../api/tasksApi'
import {TasksStateType, UpdateTaskModelType} from '../utils/types'


export const fetchTasksTC = createAsyncThunk(
  'tasks/fetchTasks',
  async (todoListId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
      const tasks = await tasksApi.getTasks(todoListId)
      thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
      return {tasks: tasks.data.items, todoListId}
    } catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  })
export const removeTaskTC = createAsyncThunk(
  'tasks/removeTask',
  async (param: { taskId: string, todoListId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
      const response = await tasksApi.deleteTask(param.todoListId, param.taskId)
      if (response.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
        return {taskId: param.taskId, todoListId: param.todoListId}
      } else {
        thunkAPI.dispatch(setAppErrorAC({error: response.messages[0]}))
        thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
        return thunkAPI.rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  })
export const addTaskTC = createAsyncThunk(
  'tasks/addTask',
  async (param: { title: string, todoListId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
      const response = await tasksApi.createTask(param.title, param.todoListId)
      if (response.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
        return {task: response.data.item}
      } else {
        handleServerAppError(response, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  })
export const updateTaskTC = createAsyncThunk(
  'tasks/updateTask',
  async (param: { taskId: string, model: UpdateTaskModelType, todoListId: string }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AppRootStateType
      const task = state.tasks[param.todoListId].find((t) => t.id === param.taskId)
      if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
      }
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model,
      }
      thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
      await tasksApi.updateTask(param.todoListId, param.taskId, apiModel)
      thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
      return {taskId: param.taskId, model: param.model, todoListId: param.todoListId}
    } catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  })

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodoListTC.fulfilled, (state, action) => {
      state[action.payload.todoList.id] = []
    })
    builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
      delete state[action.payload.todoListId]
    })
    builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
      action.payload.todoLists.forEach((tl: any) => {
        state[tl.id] = []
      })
    })
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    })
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        state[action.payload.todoListId] = action.payload.tasks
      })
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    })
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.model}
      }
    })
  }
})

export const tasksReducer = slice.reducer

