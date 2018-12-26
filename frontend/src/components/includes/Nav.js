import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Nav extends React.Component {
  render() {
    return (
      <div className="blog-masthead" id="top">
        <div className="container">
          <nav className="blog-nav">
            <NavLink to="/" className="blog-nav-item" activeClassName="active">Home</NavLink>
            <NavLink to="/newpost" className="blog-nav-item" activeClassName="active">New Post</NavLink>
          </nav>
        </div>
      </div>
    )
  }
}