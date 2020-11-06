import {FilterValuesType, TasksStateType, TodoListDomainType} from '../../../utils/types'
import React, {useCallback} from 'react'
import {Button, Grid, Paper} from '@material-ui/core'
import {EditableSpan} from '../../common/EditableSpan'
import IconButton from '@material-ui/core/IconButton/IconButton'
import {Delete} from '@material-ui/icons'
import {AddNewItemForm} from '../../common/AddNewItemForm'
import {Tasks} from './tasks/Tasks'
import {PropTypes} from '@material-ui/core'

type TodoListProps = {
  todoList: TodoListDomainType
  tasks: TasksStateType
};
export const TodoList = (props: TodoListProps) => {
  const onChangeTodoListTitle = useCallback((title: string) => alert(title), [])
  const addTask = useCallback((title: string) => alert(title), [])
  const removeTodoList = useCallback(() => alert('remove TodoList'), [])
  const onFilterButtonClickHandler = useCallback((buttonFilter) => alert(buttonFilter), [])

  const renderFilterButton = (buttonFilter: FilterValuesType, color: PropTypes.Color, text: string) => {
    return <Button variant={props.todoList.filter === buttonFilter ? 'outlined' : 'text'}
                   onClick={() => onFilterButtonClickHandler(buttonFilter)}
                   color={color}>{text}
    </Button>
  }


  return (
    <Grid key={props.todoList.id} style={{width: '480px'}} item>
      <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
        <div style={{textAlign: 'center'}}>
          <div>
            <div style={{padding: '10px', position: 'relative'}}>
              <b>
                <EditableSpan value={props.todoList.title} onChange={onChangeTodoListTitle}/>
              </b>
              <IconButton style={{position: 'absolute', right: '5px', top: '5px'}}
                          color="secondary"
                          disabled={props.todoList.entityStatus === 'loading'}
              >
                <Delete onClick={removeTodoList} fontSize="small"/>
              </IconButton>
            </div>
            <div>
              <AddNewItemForm placeholder={'Enter task name '} addItem={addTask}/>
              <Tasks tasks={props.tasks} todoListId={props.todoList.id}/>
              <div>
                {renderFilterButton('active', 'primary', 'Active')}
                {renderFilterButton('completed', 'secondary', 'Completed')}
                {renderFilterButton('all', 'default', 'All')}
              </div>
            </div>
          </div>
        </div>
      </Paper>

    </Grid>
  )
}



