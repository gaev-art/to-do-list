import {v1} from 'uuid'
import {RequestStatusType} from '../appReducer'
import {
  addTodoListTC,
  changeTodoListTitleTC,
  removeTodoListTC,
  todoListsReducer,
  changeTodoListFilterAC,
  changeTodoListEntityStatusAC
} from '../todoListsReducer'
import {FilterValuesType, TodoListDomainType, TodoListType} from '../../utils/types'


let todolistId1: string
let todolistId2: string
let startState: Array<TodoListDomainType> = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    {id: todolistId1, title: 'What to learn', filter: 'active', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: todolistId2, title: 'What to buy', filter: 'active', addedDate: '', order: 0, entityStatus: 'idle'}
  ]
})


test('correct todolist should be removed', () => {
  const endState = todoListsReducer(startState, removeTodoListTC.fulfilled({todoListId: todolistId1}, '', todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let todolist: TodoListType = {
    title: 'New Todolist',
    id: 'any id',
    addedDate: '',
    order: 0
  }

  const endState = todoListsReducer(startState, addTodoListTC.fulfilled({todoList: todolist}, '', todolist.title))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
  expect(endState[0].filter).toBe('active')
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  const endState = todoListsReducer(startState, changeTodoListTitleTC.fulfilled({
      todoListId: todolistId2,
      title: newTodolistTitle
    },
    '',
    {
      todoListId: todolistId2,
      title: newTodolistTitle
    }
  ))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'

  const action = changeTodoListFilterAC({todoListId: todolistId2, filter: newFilter})

  const endState = todoListsReducer(startState, action)

  expect(endState[0].filter).toBe('active')
  expect(endState[1].filter).toBe(newFilter)
})
test('correct entityStatus of todolist should be changed', () => {
  let entityStatus: RequestStatusType = 'success'

  const action = changeTodoListEntityStatusAC({todoListId: todolistId2, status: entityStatus})

  const endState = todoListsReducer(startState, action)

  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe(entityStatus)
})



