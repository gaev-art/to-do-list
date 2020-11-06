import React from 'react'
import {Task} from './task/Task'
import {FilterValuesType, TaskStatuses, TaskType} from '../../../../utils/types'

type TasksProps = {
  todoListId: string
  todoListFilter: FilterValuesType
  tasks: Array<TaskType>
}

export const Tasks = (props: TasksProps) => {

  let tasksForTodoList = props.tasks

  if (props.todoListFilter === 'active') {
    tasksForTodoList = props.tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (props.todoListFilter === 'completed') {
    tasksForTodoList = props.tasks.filter(
      (t) => t.status === TaskStatuses.Completed
    )
  }

  return (
    <div style={{padding: '10px', height: '160px', overflowY: 'scroll'}}>
      {tasksForTodoList.map(task => <Task key={task.id} task={task}/>)}
      {!tasksForTodoList.length && <div style={{padding: '10px', color: 'grey'}}>No task</div>}
    </div>
  )
}


