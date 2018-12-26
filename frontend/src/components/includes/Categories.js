import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories } from '../../actions'

class Categories extends React.Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories, error } = this.props

    if (error) { return <div>Error! {error.message}</div>; }

    return (
      <div className="sidebar-module">
        <h4>Categories</h4>
        <ul className="list-unstyled">
          {categories.map(category =>
            <li key={category.name}>
              <Link to={ `/category/${category.path}` }>{category.name}</Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ categoriesReducer }) {

  return {
    categories: categoriesReducer.items,
    loading: categoriesReducer.loading,
    error: categoriesReducer.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Categories);