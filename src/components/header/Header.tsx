import React, {useCallback} from 'react'
import {AppBar, Button, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import style from '../App.module.scss'
import {AddNewItemForm} from '../common/AddNewItemForm'
import {useDispatch} from 'react-redux'
import {logoutTC} from '../../redux/authReducer'
import {useAppSelector} from '../../redux/store'
import {addTodoListTC} from '../../redux/todoListsReducer'

export const Header = () => {

  const dispatch = useDispatch()

  const status = useAppSelector((state) => state.app.status)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [])
  const logout = useCallback(() => dispatch(logoutTC()), [])

  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <div className={style.itemForm}/>
        <div className={style.itemForm}>
          {isLoggedIn && <AddNewItemForm
            placeholder={'Enter to do list name '}
            addItem={addTodoList}
          />}
          {!isLoggedIn && <Typography variant="h4">To Do List!</Typography>}
        </div>
        {isLoggedIn && <Button color="inherit" onClick={logout}>Log out</Button>}
      </Toolbar>
      {status === 'loading' && <LinearProgress color="secondary"/>}
    </AppBar>
  )
}