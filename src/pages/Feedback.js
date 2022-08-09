import React, { Component } from 'react'
import { connect } from 'react-redux'
import md5 from 'crypto-js/md5'

class Feedback extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      url: ''
    })
  }

  componentDidMount = async () => {
    const { logindata } = this.props
    const gravatarEmail = "vitormonteirotomaz7@gmai.com"
    const convertedEmail = md5(gravatarEmail).toString();
    const gravatarLink = `https://www.gravatar.com/avatar/${convertedEmail}`;
    this.setState({
      url: gravatarLink
    })
  }

  render() {
    const { url } = this.state
    return (
      <div>
        <header>
          <img src={url} data-testid="header-player-name" />
          <h3 data-testid="header-score">FeedBack</h3>
        </header>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  logindata: state.player
})

export default connect(mapStateToProps, null)(Feedback)