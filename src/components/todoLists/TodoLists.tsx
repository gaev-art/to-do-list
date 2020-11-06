import React from 'react'
import {Grid} from '@material-ui/core'
import {TasksStateType, TodoListDomainType} from '../../utils/types'
import {TodoList} from './todoList/TodoList'
import {useAppSelector} from '../../redux/store'
import { Redirect } from 'react-router-dom'

type TodoListsProps = {
  todoLists: Array<TodoListDomainType>
  tasks: TasksStateType
}
export const TodoLists = (props: TodoListsProps) => {

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Redirect to={'/login'}/>
  }

  return (
    <Grid container style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {props.todoLists.map((todo) => <TodoList tasks={props.tasks} key={todo.id} todoList={todo}/>)}
    </Grid>
  )
}


