import React, {useState} from 'react'
import {Button, CircularProgress, Paper, TextField} from '@material-ui/core'
import {tasksApi} from '../api/tasksApi'

export default {
  title: 'Tasks API'
}


export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todoListId, setTodoListId] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await tasksApi.getTasks(todoListId)
    setState(response.data.items)
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


export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todoListId, setTodoListId] = useState<any>(null)
  const [title, setTitle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await tasksApi.createTask(title, todoListId)
    setState(response.data)
    setTitle('')
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


export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todoListId, setTodoListId] = useState<any>(null)
  const [taskId, setTaskId] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await tasksApi.deleteTask(todoListId, taskId)
    setState(response.data)
    setTaskId('')
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
      <TextField label={'taskId'}
                 style={{margin: '10px'}}
                 value={taskId}
                 onChange={event => setTaskId(event.currentTarget.value)}
      />
      <Button onClick={onClickHandler}>submit</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper>
  </div>
}


export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todoListId, setTodoListId] = useState<any>(null)
  const [taskId, setTaskId] = useState<any>(null)
  const [description, setDescription] = useState<any>(null)
  const [title, setTitle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await tasksApi.updateTask(todoListId, taskId, {description, title})
    setState(response)
    setTitle('')
    setDescription('')
    setTodoListId('')
    setTaskId('')
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
      <TextField label={'todoListID'}
                 style={{margin: '10px'}}
                 value={todoListId}
                 onChange={event => setTodoListId(event.currentTarget.value)}
      />
      <TextField label={'taskId'}
                 style={{margin: '10px'}}
                 value={taskId}
                 onChange={event => setTaskId(event.currentTarget.value)}
      />
      <TextField label={'description'}
                 style={{margin: '10px'}}
                 value={description}
                 onChange={event => setDescription(event.currentTarget.value)}
      />
      <Button onClick={onClickHandler}>submit</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper></div>
}
