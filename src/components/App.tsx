import React, {useEffect} from 'react'
import {CircularProgress, Container} from '@material-ui/core'
import {v1} from 'uuid'
import {TaskPriorities, TasksStateType, TaskStatuses, TodoListDomainType} from '../utils/types'
import {Header} from './header/Header'
import {TodoLists} from './todoLists/TodoLists'
import {Login} from './login/Login'
import {Switch, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../redux/store'
import {isInitializeAppTC} from '../redux/appReducer'


export const App = () => {
  const dispatch = useDispatch()

  const isInitialized = useAppSelector((state) => state.app.isInitialized)

  useEffect(() => {
    dispatch(isInitializeAppTC())
  }, [])

  const todolistId1 = v1()
  const todolistId2 = v1()

  const todoLists: Array<TodoListDomainType> = [
    {id: todolistId1, title: 'What to learn', filter: 'active', entityStatus: 'idle', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'active', entityStatus: 'loading', addedDate: '', order: 0}
  ]

  const tasks: TasksStateType = {
    [todolistId1]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      }
    ],
    [todolistId2]: [
      {
        id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      }
    ]
  }

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }


  return <div>
    <Header/>
    <Container fixed>
      <Switch>
        <Route exact path={'/'} render={() => <TodoLists todoLists={todoLists} tasks={tasks}/>}/>
        <Route path={'/login'} render={() => <Login/>}/>
      </Switch>

    </Container>
  </div>
}

