import React, { PropTypes } from 'react'
import { Form, Input, Button } from 'antd'
import classnames from 'classnames'
import styles from './LoginForm.css'

const LoginForm = ({ className, handleLogin, form }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        handleLogin(values)
      }
    })
  }

  return (
    <div className={classnames(styles.normal, className)}>
      <h3>Hello. Welcome to login.</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Item >
          {form.getFieldDecorator('email', {
            rules: [{ required: true, type: 'email', message: 'Please input your email!' }]
          })(
            <Input placeholder='Email' />
          )}
        </Form.Item>
        <Form.Item >
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }]
          })(
            <Input type='password' placeholder='Password' />
          )}
        </Form.Item>
        <Form.Item >
          <Button className={styles.submitBtn} type='primary' htmlType='submit'>Login</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  className: PropTypes.string,
  handleLogin: PropTypes.func.isRequired,
  form: PropTypes.shape({})
}

export default Form.create()(LoginForm)
