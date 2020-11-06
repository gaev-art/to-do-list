import React, {useEffect} from 'react'
import {Grid} from '@material-ui/core'
import {TodoList} from './todoList/TodoList'
import {useAppSelector} from '../../redux/store'
import {Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {fetchTodoListsTC} from '../../redux/todoListsReducer'

type PropsType = {
  demo?: boolean
}

export const TodoLists = ({demo = false}: PropsType) => {
  const dispatch = useDispatch()

  const todoLists = useAppSelector((state) => state.todoLists)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(fetchTodoListsTC())
  }, [dispatch])


  if (!isLoggedIn) {
    return <Redirect to={'/login'}/>
  }

  return (
    <Grid container style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {todoLists.map((todo) => <TodoList key={todo.id} demo={demo} todoList={todo}/>)}
    </Grid>
  )
}


