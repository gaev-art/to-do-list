import {TasksStateType} from '../../../../utils/types'
import React from 'react'
import {Task} from './task/Task'

type TasksProps = {
  tasks: TasksStateType
  todoListId: string
};
export const Tasks = (props: TasksProps) => {
  return (
    <div style={{padding: '10px', height: '160px', overflowY: 'scroll'}}>
      {props.tasks[props.todoListId].map((task) => <Task key={task.id} task={task}/>)}
    </div>
  )
}


