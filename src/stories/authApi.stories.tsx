import React, {useState} from 'react'
import {Button, CircularProgress, Paper, TextField} from '@material-ui/core'
import {authApi} from '../api/authApi'

export default {
  title: 'Auth API'
}


export const Login = () => {
  const [state, setState] = useState<any>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const rememberMe = false

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await authApi.login({email, password, rememberMe})
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
      <TextField label={'email'}
                 style={{margin: '10px'}}
                 value={email}
                 onChange={event => setEmail(event.currentTarget.value)}
      />
      <TextField label={'password'}
                 type={'password'}
                 style={{margin: '10px'}}
                 value={password}
                 onChange={event => setPassword(event.currentTarget.value)}
      />
      <Button onClick={onClickHandler}>submit</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper></div>
}

export const Logout = () => {
  const [state, setState] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await authApi.logout()
    setState(response.data)
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
      <Button onClick={onClickHandler}>Logout</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper></div>
}


export const GetCaptchaUrl = () => {
  const [state, setState] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await authApi.getCaptchaUrl()
    setState(response.data.url)
    setIsLoading(false)
  }

  if (isLoading) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Button onClick={onClickHandler}>submit</Button>
    <img alt="" src={state}/>
  </div>
}


export const Me = () => {
  const [state, setState] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setIsLoading(true)
    const response = await authApi.me()
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