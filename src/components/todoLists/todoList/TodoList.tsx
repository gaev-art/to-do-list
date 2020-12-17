import {FilterValuesType, TodoListDomainType} from '../../../utils/types'
import React, {useCallback, useEffect} from 'react'
import {Button, Grid, Paper, PropTypes} from '@material-ui/core'
import {EditableSpan} from '../../common/EditableSpan'
import IconButton from '@material-ui/core/IconButton/IconButton'
import {Delete} from '@material-ui/icons'
import {AddNewItemForm} from '../../common/AddNewItemForm'
import {Tasks} from './tasks/Tasks'
import {useDispatch} from 'react-redux'
import {changeTodoListFilterAC, changeTodoListTitleTC, removeTodoListTC} from '../../../redux/todoListsReducer'
import {addTaskTC, fetchTasksTC} from '../../../redux/tasksReducer'
import {useAppSelector} from '../../../redux/store'

type TodoListProps = {
  todoList: TodoListDomainType
  demo?: boolean
}

export const TodoList = ({demo = false, ...props}: TodoListProps) => {

  const dispatch = useDispatch()


  const onChangeTodoListTitle = useCallback((title: string) => dispatch(changeTodoListTitleTC({
    todoListId: props.todoList.id,
    title
  })), [props.todoList.id])

  const addTask = useCallback((title: string) => dispatch(addTaskTC({
    todoListId: props.todoList.id,
    title
  })), [props.todoList.id])

  const removeTodoList = useCallback(() => dispatch(removeTodoListTC(props.todoList.id)), [props.todoList.id])

  const onFilterButtonClickHandler = useCallback((buttonFilter) => dispatch(changeTodoListFilterAC({
    todoListId: props.todoList.id,
    filter: buttonFilter
  })), [props.todoList.id])

  const renderFilterButton = (buttonFilter: FilterValuesType, color: PropTypes.Color, text: string) => {
    return <Button variant={props.todoList.filter === buttonFilter ? 'outlined' : 'text'}
                   onClick={() => onFilterButtonClickHandler(buttonFilter)}
                   color={color}>{text}
    </Button>
  }

  useEffect(() => {
    if (demo) {
      return
    }
    dispatch(fetchTasksTC(props.todoList.id))
  }, [props.todoList.id])

  const tasks = useAppSelector((state) => state.tasks)

  let allTodolistTasks = tasks[props.todoList.id]

  return (
    <Grid style={{width: '480px'}} item>
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
              <Tasks
                tasks={allTodolistTasks}
                todoListFilter={props.todoList.filter}
                todoListId={props.todoList.id}/>
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



