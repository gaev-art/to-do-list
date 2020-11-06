import {addTaskTC, fetchTasksTC, removeTaskTC, tasksReducer, updateTaskTC} from '../tasksReducer'
import {addTodoListTC, fetchTodoListsTC, removeTodoListTC} from '../todoListsReducer'
import {TaskPriorities, TasksStateType, TaskStatuses} from '../../utils/types'

let startState: TasksStateType = {}
beforeEach(() => {
  startState = {
    'todolistId1': [
      {
        id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      }
    ],
    'todolistId2': [
      {
        id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      }
    ]
  }
})

test('correct task should be removed', () => {

  const endState = tasksReducer(startState, removeTaskTC.fulfilled({
      taskId: '2',
      todoListId: 'todolistId2'
    },
    '',
    {taskId: '2', todoListId: 'todolistId2'}))

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {

  const endState = tasksReducer(startState, addTaskTC.fulfilled({
      task: {
        todoListId: 'todolistId2',
        title: 'juice',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'id exists'
      }
    },
    '',
    {
      todoListId: 'todolistId2',
      title: 'juice'
    }
  ))

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juice')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

  const endState = tasksReducer(startState, updateTaskTC.fulfilled({
      taskId: '2',
      model: {status: TaskStatuses.New},
      todoListId: 'todolistId2'
    },
    '',
    {
      todoListId: 'todolistId2',
      taskId: '2',
      model: {status: TaskStatuses.New},
    }
  ))

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {

  const endState = tasksReducer(startState, updateTaskTC.fulfilled({
      todoListId: 'todolistId2',
      model: {title: 'yogurt'},
      taskId: '2'
    },
    '',
    {
      todoListId: 'todolistId2',
      model: {title: 'yogurt'},
      taskId: '2'
    }
  ))

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('yogurt')
  expect(endState['todolistId2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {

  const endState = tasksReducer(startState, addTodoListTC.fulfilled({
      todoList: {
        title: 'new todolist',
        addedDate: '',
        id: 'id',
        order: 0
      }
    },
    '',
    'new todolist'
  ))


  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

  const endState = tasksReducer(startState, removeTodoListTC.fulfilled({todoListId: 'todolistId2'}, '', 'todolistId2'))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {

  const endState = tasksReducer({}, fetchTodoListsTC.fulfilled({
      todoLists: [
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
      ]
    },
    ''
  ))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toBeDefined()
  expect(endState['2']).toBeDefined()
})

test('tasks should be added for todolist', () => {

  const endState = tasksReducer({
    'todolistId2': [],
    'todolistId1': []
  }, fetchTasksTC.fulfilled({tasks: startState['todolistId1'], todoListId: 'todolistId1'}, '', 'todolistId1'))

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(0)
})

