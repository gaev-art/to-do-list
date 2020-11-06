import React from 'react'
import {Container} from '@material-ui/core'
import {v1} from 'uuid'
import {TaskPriorities, TasksStateType, TaskStatuses, TodoListDomainType} from '../utils/types'
import {Header} from './header/Header'
import {TodoLists} from './todoLists/TodoLists'


export const App = () => {

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


  return <div>
    <Header/>
    <Container fixed>
      <TodoLists todoLists={todoLists} tasks={tasks}/>
    </Container>
  </div>
}

