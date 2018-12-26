import React from 'react'
import ReactLoading from 'react-loading'

export default class Loading extends React.Component {
  render() {
    return (
      <ReactLoading type={'balls'} color={'cyan'} height='40' width='80' />
    )
  }
}