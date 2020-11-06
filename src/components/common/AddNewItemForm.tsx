import React, {useState} from 'react'
import {TextField} from '@material-ui/core'

type PropsType = {
  placeholder: string
  addItem: (title: string) => void
}


export const AddNewItemForm = React.memo((props: PropsType) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>('')


  const onKeYPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === 'Enter') {
      onAddItemClick()
    }
  }

  const onAddItemClick = () => {
    let newTitle = title.trim()
    if (newTitle !== '') {
      props.addItem(newTitle)
      setTitle('')

    } else {
      setError('Title is required')
    }
  }

  const onTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }


  return (
    <div style={{margin: '15px', height: '60px'}}>
      <TextField
        value={title}
        onKeyPress={onKeYPress}
        onChange={onTitleChanged}
        label={props.placeholder}
        error={!!error}
        helperText={error}
      />
    </div>
  )

})
