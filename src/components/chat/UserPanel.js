import React, { Component } from 'react'
import { Grid, Header, Dropdown, Image } from 'semantic-ui-react'
import firebase from '../../firebase'

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  }

  dropdownOptions = () => [
    {
      key: 'user',
      text: (
        <span>
          Signed is as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>
    },
    {
      key: 'signout',
      text: <span onClick={this.onClickLogout}>Sign Out</span>
    }
  ]

  onClickLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('yep'))
  }

  render() {
    return (
      <Grid style={{ background: '#4c3c4c' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2rem', margin: 9 }}>
            <Header inverted floated="left" as="h2">
              <Header.Content>INchating</Header.Content>
            </Header>
            <Header style={{ padding: '0.25em' }} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image
                      src={this.state.user.photoURL}
                      spaced="right"
                      avatar
                    />
                    {this.state.user.displayName}
                  </span>
                }
                options={this.dropdownOptions()}
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

export default UserPanel
