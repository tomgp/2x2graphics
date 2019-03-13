import React from 'react'
import { connect } from 'react-redux'
import TwoByTwo from '../components/two-by-two'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
//    const isServer = !!req

    return {}
  }

  componentDidMount () {
    // const { dispatch } = this.props
    // this.timer = startClock(dispatch)
  }

  componentWillUnmount () {
    // clearInterval(this.timer)
  }

  render () {
    return <TwoByTwo />
  }
}

export default connect()(Index)
