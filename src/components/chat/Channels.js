import React, { Component } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import firebase from '../../firebase'
import { setCurrentChannel } from '../../actions'

class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: '',
    channelDetails: '',
    channelsRef: firebase.database().ref('channels'),
    modal: false,
    firstLoaded: true,
    activeChannel: ''
  }

  componentDidMount() {
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  removeListeners = () => {
    this.state.channelsRef.off()
  }

  addListeners = () => {
    const loadedChannels = []

    this.state.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val())

      this.setState({ channels: loadedChannels }, () => this.setFirstChannel())
    })
  }

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0]

    if (this.state.firstLoaded && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel)
      this.setActiveChannel(firstChannel)
    }

    this.setState({ firstLoaded: false })
  }

  onClickClose = () => this.setState({ modal: false })

  onClickOpenModal = () => this.setState({ modal: true })

  onHandleChange = e => this.setState({ [e.target.name]: e.target.value })

  onClickSubmitChannel = e => {
    e.preventDefault()

    if (this.isFormValid(this.state)) {
      this.addChannel()
    }
  }

  addChannel = () => {
    const { user, channelName, channelDetails, channelsRef } = this.state
    const key = channelsRef.push().key
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    }

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: '', channelDetails: '' })
        this.onClickClose()
        console.log('added chanel!')
      })
      .catch(err => {
        console.log(err)
      })
  }

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails

  changeChannel = channel => {
    this.setActiveChannel(channel)
    this.props.setCurrentChannel(channel)
  }

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id })
  }

  renderChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ))

  render() {
    const { channels, modal } = this.state

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" />
              CHANNELS
            </span>
            ({channels.length}){' '}
            <Icon name="add" onClick={this.onClickOpenModal} />
          </Menu.Item>
          {this.renderChannels(channels)}
        </Menu.Menu>
        <Modal basic open={modal} onClose={this.onClickClose}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.onClickSubmitChannel}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.onHandleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.onHandleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.onClickSubmitChannel}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.onClickClose}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  { setCurrentChannel }
)(Channels)
