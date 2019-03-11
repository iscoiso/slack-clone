import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import ColorPanel from './chat/ColorPanel'
import SidePanel from './chat/SidePanel'
import Messages from './chat/Messages'
import MetaPanel from './chat/MetaPanel'

const App = props => {
  return (
    <Grid columns="equal" className="app">
      <ColorPanel />
      <SidePanel currentUser={props.currentUser} />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  )
}

const mapStateToprops = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToprops)(App)
