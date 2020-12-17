import React, {useCallback, useState} from 'react'
import {TextField} from '@material-ui/core'
import style from './EditableSpan.module.css'
import {TaskStatuses} from '../../utils/types'

type PropsType = {
  value: string
  onChange: (title: string) => void
  checked?: TaskStatuses
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

  const styles = !props.checked ? `${style.span}` : `${style.lineThrough}`

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
        : <span className={styles} onDoubleClick={activeEditMode}>{props.value}</span>}
    </>
  )
})

