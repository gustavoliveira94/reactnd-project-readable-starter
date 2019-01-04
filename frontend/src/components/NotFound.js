import React from 'react'
import Nav from './includes/Nav'

export default class NotFound extends React.Component {
  render() {

    return (
      <React.Fragment>
        <Nav/>
        <h1>Página não encontrada!</h1>
      </React.Fragment>
    )
  }
}
