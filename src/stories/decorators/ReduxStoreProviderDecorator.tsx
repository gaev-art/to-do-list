import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'
import {v1} from 'uuid'
import thunkMiddleware from 'redux-thunk'
import {tasksReducer} from '../../redux/tasksReducer'
import {todoListsReducer} from '../../redux/todoListsReducer'
import {appReducer} from '../../redux/appReducer'
import {AppRootStateType, RootReducerType} from '../../redux/store'
import {authReducer} from '../../redux/authReducer'
import {configureStore} from '@reduxjs/toolkit'
import {TaskPriorities, TaskStatuses} from '../../utils/types'

const rootReducer: RootReducerType = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer,
  auth: authReducer
})

const initialGlobalState: AppRootStateType = {
  todoLists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'active', entityStatus: 'idle', addedDate: '', order: 0},
    {id: 'todolistId2', title: 'What to buy', filter: 'active', entityStatus: 'loading', addedDate: '', order: 0}
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      }
    ],
    ['todolistId2']: [
      {
        id: v1(), title: 'Milk', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      }
    ]
  },
  app: {
    error: null,
    status: 'success',
    isInitialized: true
  },
  auth: {
    isLoggedIn: true,
    captcha: ''
  }
}

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider
    store={storyBookStore}>
    {storyFn()}
  </Provider>)
