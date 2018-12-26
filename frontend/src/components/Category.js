import React from 'react'

import Posts from './includes/Posts'
import Categories from './includes/Categories'
import Header from '../components/includes/Header'
import Nav from '../components/includes/Nav'

export default class Category extends React.Component {
  
  render() {
    const { match } = this.props
    const category = match.params.categoryPath
    // console.log(category)

    return (
      <React.Fragment>
        <Nav />
        <div className='container'>
          <Header />
          <div className="row">
            <div className="col-sm-8 blog-main">
              <Posts category={ category } />
            </div>
            <div className="col-sm-3 col-sm-offset-1 blog-sidebar">
              <Categories />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
