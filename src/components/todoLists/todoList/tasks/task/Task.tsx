import React, {useCallback} from 'react'
import {Checkbox, Paper} from '@material-ui/core'
import {TaskStatuses, TaskType} from '../../../../../utils/types'
import style from '../../../../App.module.scss'
import {EditableSpan} from '../../../../common/EditableSpan'
import IconButton from '@material-ui/core/IconButton/IconButton'
import {Delete} from '@material-ui/icons'
import {useDispatch} from 'react-redux'
import {removeTaskTC, updateTaskTC} from '../../../../../redux/tasksReducer'

type TaskProps = {
  task: TaskType
}

export const Task = (props: TaskProps) => {
  const dispatch = useDispatch()

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateTaskTC({
    taskId: props.task.id,
    model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
    todoListId: props.task.todoListId
  })), [props.task])

  const onChangeTaskTitle = useCallback((title: string) => dispatch(updateTaskTC({
    taskId: props.task.id,
    model: {title},
    todoListId: props.task.todoListId
  })), [props.task])

  const removeTask = useCallback(() => dispatch(removeTaskTC({
    todoListId: props.task.todoListId,
    taskId: props.task.id
  })), [props.task])

  return (
    <Paper draggable={true}
           key={props.task.id} style={{margin: '6px', padding: '3px'}}>
      <div className={props.task.status === TaskStatuses.Completed ? style.isDone : ''}
           style={{
             padding: '5px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             position: 'relative'
           }}>
        <Checkbox style={{position: 'absolute', left: '2px'}}
                  checked={props.task.status === TaskStatuses.Completed}
                  onChange={onChangeHandler}
                  color="primary"
        />
        <EditableSpan value={props.task.title} checked={props.task.status} onChange={onChangeTaskTitle}/>
        <IconButton style={{position: 'absolute', right: '2px'}}
                    color="secondary"
                    onClick={removeTask}
        >
          <Delete fontSize="small"/>
        </IconButton>
      </div>
    </Paper>
  )
}