import {combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {authReducer} from './authReducer'
import {appReducer} from './appReducer'
import {todoListsReducer} from './todoListsReducer'
import {tasksReducer} from './tasksReducer'


const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  todoLists: todoListsReducer,
  tasks: tasksReducer,
})


export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type RootReducerType = typeof rootReducer

export type AppRootStateType = ReturnType<RootReducerType>




// @ts-ignore
window.store = store