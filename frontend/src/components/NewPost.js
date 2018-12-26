import React from 'react'
import { connect } from 'react-redux'
import Categories from './includes/Categories'
import Header from '../components/includes/Header'
import Nav from '../components/includes/Nav'
import { newPost } from '../actions'

import Loading from './includes/Loading'

class NewPost extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    
    const formData = {}
    for (const field in this.refs) {
      formData[field] = this.refs[field].value
    }

    // save
    this.props.newPost(formData, this.onPostSuccess)
  }

  onPostSuccess = (response) => {
    this.props.history.push(`/post/${response.id}`);
  }


  render() {
    const { categories, error, loading } = this.props

    if (error) { return <div>Error! {error.message}</div>; }

    if (loading) { return <Loading />}

    return (
      <React.Fragment>
        <Nav />
        <div className='container'>
          <Header />
          <div className="row">
            <div className="col-sm-8 blog-main">
              <h2>Create New Post</h2>
              <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                  <label>Title</label>
                  <input name="title" ref="title" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                  <label>Body</label>
                  <textarea name="body" ref="body" className="form-control"/>
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input name="author" ref="author" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" ref="category" className="form-control">
                  {categories.map(category =>
                    <option key={category.path} value={ category.path }>{category.name}</option>
                  )}
                  </select>
                </div>
                <button type="submit" className="btn btn-default">Post</button>
              </form>
            </div>
            <div className="col-sm-3 col-sm-offset-1 blog-sidebar">
              <Categories/>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps ({ categoriesReducer }) {
  return {
    categories: categoriesReducer.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    newPost: (formData, callback) => dispatch(newPost(formData, callback))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(NewPost);