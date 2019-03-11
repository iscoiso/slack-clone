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
import firebase from '../../firebase'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false
  }

  displayErrors = errors => errors.map((err, i) => <p key={i}>{err.message}</p>)

  onHandleChange = e => this.setState({ [e.target.name]: e.target.value })

  onClickSubmit = e => {
    e.preventDefault()

    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser)
        })
        .catch(err => {
          console.log(err)
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          })
        })
    }
  }

  isFormValid = ({ email, password }) => email && password

  handleInputError = (errors, inputName) =>
    errors.some(err => err.message.toLowerCase().includes(inputName))
      ? 'error'
      : ''

  render() {
    const { email, password, errors, loading } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            Log in INchating
          </Header>
          <Form onSubmit={this.onClickSubmit} size="large">
            <Segment stacked>
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

              <Button
                className={loading ? 'loading' : ''}
                disabled={loading}
                color="violet"
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
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login
