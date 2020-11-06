import React, {useCallback, useState} from 'react'
import {TextField} from '@material-ui/core'
import style from './EditableSpan.module.css'

type PropsType = {
  value: string
  onChange: (title: string) => void
}


export const EditableSpan = React.memo((props: PropsType) => {

  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState('')


  const activeEditMode = useCallback(() => {
    setIsEditMode(true)
    setTitle(props.value)
  }, [props.value])

  const deActiveEditMode = useCallback(() => {
    props.onChange(title)
    setIsEditMode(false)
  }, [props, title])

  const onKeYPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.onChange(title)
      setIsEditMode(false)
    }
  }, [props, title])

  const onTitleChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }, [])

  return (
    <>
      {isEditMode
        ? <TextField
          value={title}
          onKeyPress={onKeYPress}
          onChange={onTitleChanged}
          autoFocus
          onBlur={deActiveEditMode}
        />
        : <span className={style.span} onDoubleClick={activeEditMode}>{props.value}</span>}
    </>
  )
})

