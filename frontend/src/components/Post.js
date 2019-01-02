import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as moment from 'moment-timezone'
import Loading from './includes/Loading'
import Categories from './includes/Categories'
import Header from '../components/includes/Header'
import Nav from '../components/includes/Nav'
import { fetchPostById, votePost, deletePost } from '../actions'
import Comments from './includes/Comments'

class Post extends React.Component {

  componentDidMount() {
    const { match } = this.props
    this.props.fetchPostById( match.params.postId)
  }

  vote = (value) => {
    const { match } = this.props
    this.props.votePost(match.params.postId, value)
  }

  deletePost = (id) => {
    const { match } = this.props
    this.props.deletePost(match.params.postId)
  }

  render() {
    const { post, error, loading } = this.props
    const { vote, deletePost } = this

    if (error) { return <div>Error! {error.message}</div>; }

    if (loading) { return <Loading />}

    return (
      <React.Fragment>
        <Nav />
        <div className='container'>
          <Header />
          <div className="row">
            <div className="col-sm-8 blog-main">
              {post &&
                <React.Fragment>
                  <h2 className="blog-post-title">{post.title}</h2>
                  <p className="blog-post-meta">Posted on {moment(post.timestamp).format("MM/DD/YYYY")} by {post.author} | <Link to={ `/category/${post.category}`}>{post.category}</Link></p>
                  <p>{post.body}</p>
                  <hr/>
                  Votes
                  <div className="btn-group">
                    <button type="button" onClick={ () => vote('downVote') } className="btn btn-default"><i className="fa fa-caret-down" /></button>
                    <button type="button" disabled className="btn btn-default">{post.voteScore}</button>
                    <button type="button" onClick={ () => vote('upVote') } className="btn btn-default"><i className="fa fa-caret-up" /></button>
                  </div>
                  <div className="btn-group">
                    <label>Comments: {post.commentCount}</label>
                    <Link to="/updatepost">Editar</Link>
                    <a href="/" onClick={() => deletePost(post.id)}>Excluir</a>
                  </div>
                  <hr/>
                  { post.id && <Comments postId={ post.id } /> }
                </React.Fragment>
              }
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

function mapStateToProps ({ singlePostReducer }) {
  return {
    post: singlePostReducer.item,
    loading: singlePostReducer.loading,
    error: singlePostReducer.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostById: (postId) => dispatch(fetchPostById(postId)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    votePost: (postId, vote) => dispatch(votePost(postId, vote))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Post);