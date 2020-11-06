import React, {useState} from 'react'
import {Button, CircularProgress, Paper, TextField} from '@material-ui/core'
import {todoListsApi} from '../api/todoListsApi'

export default {
  title: 'Todolists API'
}


export const GetTodolists = () => {
  const [state, setState] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await todoListsApi.getTodoLists()
    setState(response)
    setIsLoading(false)
  }

  if (isLoading) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return <div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Button onClick={onClickHandler}>submit</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper>
  </div>
}


export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await todoListsApi.createTodoList(title)
    setState(response.data)
    setTitle('')
    setIsLoading(false)
  }

  if (isLoading) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return <div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <TextField label={'title'}
                 style={{margin: '10px'}}
                 value={title}
                 onChange={event => setTitle(event.currentTarget.value)}
      />
      <Button onClick={onClickHandler}>submit</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper>
  </div>
}


export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todoListId, setTodoListId] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await todoListsApi.deleteTodoList(todoListId)
    setState(response.data)
    setTodoListId('')
    setIsLoading(false)
  }
  if (isLoading) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return <div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <TextField label={'todoListID'}
                 style={{margin: '10px'}}
                 value={todoListId}
                 onChange={event => setTodoListId(event.currentTarget.value)}
      />
      <Button onClick={onClickHandler}>submit</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper>
  </div>
}


export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todoListId, setTodoListId] = useState<any>(null)
  const [title, setTitle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await todoListsApi.updateTitleTodoList(todoListId, title)
    setState(response.data)
    setTodoListId('')
    setTitle('')
    setIsLoading(false)
  }
  if (isLoading) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return <div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <TextField label={'todoListID'}
                 style={{margin: '10px'}}
                 value={todoListId}
                 onChange={event => setTodoListId(event.currentTarget.value)}
      />
      <TextField label={'title'}
                 style={{margin: '10px'}}
                 value={title}
                 onChange={event => setTitle(event.currentTarget.value)}
      />
      <Button onClick={onClickHandler}>submit</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper>
  </div>
}
