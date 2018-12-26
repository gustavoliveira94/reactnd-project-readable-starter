import React from 'react'
import * as _ from 'lodash'
import * as moment from 'moment-timezone'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../includes/Loading'
import { fetchPosts, sortPosts } from '../../actions'

class Posts extends React.Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  sortBy = (key) => {
    this.props.sortPosts(key)
  }

  render() {
    const { sortBy } = this
    const { posts, error, loading, category, sortByCriteria } = this.props

    const filteredPosts = category
      ? posts.filter( p => p.category === category && p.deleted === false )
      : posts.filter( p => p.deleted === false )

    const sortedPosts = _.orderBy(filteredPosts, [sortByCriteria !== undefined ? sortByCriteria : 'timestamp'], 'desc');
      
    if (error) { return <div>Error! {error.message}</div>; }

    if (loading) { return <Loading />}

    return (
      <React.Fragment>

        <form className="form-inline">
          <div className="form-group">
            <p className="form-control-static">Sort by: </p>
          </div>
          <div className="form-group">
            <select
              defaultValue="none"
              onChange={ (event) => (sortBy(event.target.value))}
              className="form-control"
              id="sortBy"
            >
              <option value="none" disabled>select...</option>
              <option value="timestamp">Date</option>
              <option value="voteScore">Vote Score</option>
            </select>
          </div>
        </form>
        <hr/>

        { sortedPosts.map(post =>  
          <div className="blog-post" key={ `post-${post.id}` }>
            <Link to={ "/post/" + post.id } className="blog-post-title">{post.title}</Link>
            <p className="text-muted"> {post.voteScore} votes | by {post.author} on {moment(post.timestamp).format("MM/DD/YYYY")} | {post.commentCount} comments</p>
            <hr/>
          </div>
        )}
      </React.Fragment>
    )
  }
}

function mapStateToProps ({ postsReducer, ownProps }) {
  return {
    posts: postsReducer.items,
    sortByCriteria: postsReducer.sortByCriteria,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sortPosts: (sortByCriteria) => dispatch(sortPosts(sortByCriteria)),
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Posts);