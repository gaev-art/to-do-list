import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {loginTC} from '../../redux/authReducer'
import {useAppSelector} from '../../redux/store'
import {Redirect} from 'react-router-dom'

export const Login = () => {

  const dispatch = useDispatch()

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const captcha = useAppSelector((state) => state.auth.captcha)

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return {
          email: 'Email is required'
        }
      }
      if (!values.password) {
        return {
          password: 'Password is required'
        }
      }
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      captcha: ''
    },
    onSubmit: values => {
      dispatch(loginTC(values))
    },
  })

  if (isLoggedIn) {
    return <Redirect to={'/to-do-list'}/>
  }

  return <Grid container justify='center'>
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel>
          <p>To log in get registered -
            <a href={'https://social-network.samuraijs.com/'}>here</a>
          </p>
          <p>or use common test account credentials:</p>
          <p>Email: free@samuraijs.com</p>
          <p>Password: free</p>
        </FormLabel>
        <FormGroup>
          <TextField
            label="Email"
            margin="normal"
            {...formik.getFieldProps('email')}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <TextField
            type="password"
            label="Password"
            margin="normal"
            {...formik.getFieldProps('password')}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
          <FormControlLabel
            label={'Remember me'}
            control={<Checkbox
              {...formik.getFieldProps('rememberMe')}
              checked={formik.values.rememberMe}
            />}
          />
          {captcha && <img alt="" src={captcha}/>}
          {captcha && <TextField
            margin="normal"
            {...formik.getFieldProps('captcha')}
          />
          }
          <Button type={'submit'}>Login</Button>
        </FormGroup>
      </FormControl>
    </form>
  </Grid>
}

