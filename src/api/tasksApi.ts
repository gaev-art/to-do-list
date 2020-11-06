import {instance} from './instance'
import {GetTasksResponse, ResponseType, TaskType, UpdateTaskModelType} from '../utils/types'

export const tasksApi = {
  getTasks(todoListId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todoListId}/tasks`)

  },
  createTask(title: string, todoListId: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks`, {title})
      .then(res => res.data)
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
      .then(res => res.data)
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
      .then(res => res.data.data)
  },
}

