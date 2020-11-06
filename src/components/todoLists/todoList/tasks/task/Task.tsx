import React, {useCallback} from 'react'
import {Checkbox, Paper} from '@material-ui/core'
import {TaskStatuses, TaskType} from '../../../../../utils/types'
import style from '../../../../App.module.scss'
import {EditableSpan} from '../../../../common/EditableSpan'
import IconButton from '@material-ui/core/IconButton/IconButton'
import {Delete} from '@material-ui/icons'

type TaskProps = {
  task: TaskType
};
export const Task = (props: TaskProps) => {

  const onChangeHandler = useCallback(() => alert('cheeked'), [])
  const onChangeTaskTitle = useCallback((title: string) => alert(title), [])
  const removeTask = useCallback(() => alert('remove Task'), [])


  return (
    <Paper key={props.task.id} style={{margin: '6px', padding: '3px'}}>
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
        <EditableSpan value={props.task.title} onChange={onChangeTaskTitle}/>
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