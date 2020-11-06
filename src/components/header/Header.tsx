import React, {useCallback} from 'react'
import {AppBar, Button, Toolbar} from '@material-ui/core'
import style from '../App.module.scss'
import {AddNewItemForm} from '../common/AddNewItemForm'

export const Header = () => {

  const addTodoList = useCallback((title: string) => alert(title), [])
  const logout = useCallback(() => alert('logout'), [])

  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <div className={style.itemForm}/>
        <div className={style.itemForm}>
          <AddNewItemForm placeholder={'Enter to do list name '} addItem={addTodoList}/>
        </div>
        <Button onClick={logout} color="inherit">logout</Button>
      </Toolbar>
    </AppBar>
  )
}