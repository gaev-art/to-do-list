import {tasksReducer} from '../tasksReducer'
import {addTodoListTC, todoListsReducer} from '../todoListsReducer'
import {TasksStateType, TodoListDomainType, TodoListType,} from '../../utils/types'

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodoListDomainType> = []

  let todolist: TodoListType = {
    title: 'new todolist',
    id: 'any id',
    addedDate: '',
    order: 0
  }

  const action = addTodoListTC.fulfilled({todoList: todolist}, '', todolist.title)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todoList.id)
  expect(idFromTodolists).toBe(action.payload.todoList.id)
})
