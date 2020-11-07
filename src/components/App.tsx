import React, {useEffect} from 'react'
import {CircularProgress, Container} from '@material-ui/core'
import {Header} from './header/Header'
import {TodoLists} from './todoLists/TodoLists'
import {Login} from './login/Login'
import {Route, Switch} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../redux/store'
import {isInitializeAppTC} from '../redux/appReducer'
import {ErrorSnackBar} from './common/ErrorSnackbar'

type PropsType = {
  demo?: boolean
}

export const App = ({demo = false}: PropsType) => {
  const dispatch = useDispatch()

  const isInitialized = useAppSelector((state) => state.app.isInitialized)

  useEffect(() => {
    dispatch(isInitializeAppTC())
  }, [])


  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }


  return <div>
    <Header/>
    <Container fixed>
      <ErrorSnackBar/>
      <Switch>
        <Route exact path={'/to-do-list'} render={() => <TodoLists demo={demo}/>}/>
        <Route path={'/login'} render={() => <Login/>}/>
      </Switch>

    </Container>
  </div>
}

