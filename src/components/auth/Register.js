import React, { Component } from 'react'
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Input
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import md5 from 'md5'
import firebase from '../../firebase'

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  }

  isFormValid = () => {
    const errors = []
    let error

    if (this.ifFormEmpty(this.state)) {
      // throw error
      error = { message: 'Fill in all fields' }
      this.setState({ errors: errors.concat(error) })

      return false
    } else if (!this.isPasswordValid(this.state)) {
      // throw error
      error = { message: 'Password is invalid' }
      this.setState({ errors: errors.concat(error) })

      return false
    } else {
      return true
    }
  }

  ifFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    )
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false
    } else if (password !== passwordConfirmation) {
      return false
    } else {
      return true
    }
  }

  displayErrors = errors => errors.map((err, i) => <p key={i}>{err.message}</p>)

  onHandleChange = e => this.setState({ [e.target.name]: e.target.value })

  onClickSubmit = e => {
    e.preventDefault()

    if (this.isFormValid()) {
      const { email, password } = this.state

      this.setState({ errors: [], loading: true })

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(newUser => {
          console.log(newUser)
          newUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                newUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(newUser).then(() => {
                console.log('created!!!')
              })
            })
            .catch(err => {
              console.log('yooo', err)
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              })
            })
        })
        .catch(err => {
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          })
          console.log(err)
        })
    }
  }

  saveUser = newUser => {
    return this.state.usersRef.child(newUser.user.uid).set({
      name: newUser.user.displayName,
      avatar: newUser.user.photoURL
    })
  }

  handleInputError = (errors, inputName) =>
    errors.some(err => err.message.toLowerCase().includes(inputName))
      ? 'error'
      : ''

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            Sign Up in INchating
          </Header>
          <Form onSubmit={this.onClickSubmit} size="large">
            <Segment stacked>
              <Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.onHandleChange}
                type="text"
                value={username}
                className={this.handleInputError(errors, 'username')}
              />
              <Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.onHandleChange}
                type="email"
                value={email}
                className={this.handleInputError(errors, 'email')}
              />
              <Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.onHandleChange}
                type="password"
                value={password}
                className={this.handleInputError(errors, 'password')}
              />
              <Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.onHandleChange}
                type="password"
                value={passwordConfirmation}
                className={this.handleInputError(errors, 'password')}
              />
              <Button
                className={loading ? 'loading' : ''}
                disabled={loading}
                color="orange"
                fluid
                size="large"
              >
                Sign Up
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a user <Link to="/login">Log In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Register
