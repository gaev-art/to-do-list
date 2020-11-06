import {instance} from './instance'
import {ResponseType, TodoListType} from './types'

export const todoListsApi = {
  getTodoLists() {
    return instance.get<TodoListType[]>('/todo-lists')
      .then(res => res.data)
  },
  createTodoList(title: string) {
    return instance.post<ResponseType<{ item: TodoListType }>>('/todo-lists', {title})
      .then(res => res.data)
  },
  deleteTodoList(todoListId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
      .then(res => res.data)
  },
  updateTitleTodoList(todoListId: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
      .then((res) => res.data)
  },
}


