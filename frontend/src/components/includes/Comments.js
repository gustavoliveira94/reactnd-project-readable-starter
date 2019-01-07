import React from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment-timezone'
import { fetchComments, postComment, deleteComment, updateComment, voteComment } from '../../actions'
import Loading from './Loading'

class Comments extends React.Component {

  state = {
    id: '',
    key: '',
    author: '',
    body: '',
    visible: false
  }

  componentDidMount() {
    this.props.fetchComments(this.props.postId)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = {}
    for (const field in this.refs) {
      formData[field] = this.refs[field].value
    }

    // save
    this.props.postComment(formData, this.props.postId, this.onPostSuccess)
  }

  handleUpdate = (e) => {
    e.preventDefault()
    const formData = {}
    for (const field in this.refs) {
      formData[field] = this.refs[field].value
    }

    // save
    this.props.updateComment(formData, this.state.id, this.props.postId, this.onPostSuccess)
    this.setState({
      visible: false
    })
  }

  onPostSuccess = (response) => {
    console.log('onPostSuccess')
  }

  deleteComment = (id) => {
    this.props.deleteComment(id)
  }

  handleComment = (id, k, author, body) => {
    this.setState({
      id: id,
      key: k,
      author: author,
      body: body,
      visible: true
    })
  }

  vote = (id, value) => {
    this.props.voteComment(id, value)
  }

  render() {

    const { comments, error, loading } = this.props

    if (error) { return <div>Error! {error.message}</div>; }

    if (loading) { return <Loading /> }

    console.log(comments)

    return (
      <React.Fragment>
        <ul className="nav nav-tabs">
          <li className="active">Comments</li>
        </ul>
        <div className="tab-content">
          {comments && comments.map((item, key) =>
            <div className="tab-pane active" key={`comment-${item.id}`}>
              <div className="well well-lg">
                <h4 className="media-heading text-uppercase reviews">{item.author}</h4>
                <p>{item.body}</p>
                <a href="" onClick={() => this.vote(item.id, 'downVote')} className="btn btn-default"><i className="fa fa-caret-down" /></a>
                <button type="button" disabled className="btn btn-default">{item.voteScore}</button>
                <a href="" onClick={() => this.vote(item.id, 'upVote')} className="btn btn-default"><i className="fa fa-caret-up" /></a>
                <div className="text-muted">Commented on {moment(item.timestamp).format("MM/DD/YYYY")}</div>
                <a className="editar" href="#" onClick={(id, k, author, body) => this.handleComment(item.id, key, item.author, item.body)}>Editar</a>
                <a href="#" onClick={() => this.deleteComment(item.id)}>Excluir</a>
              </div>
            </div>
          )}
          {
            this.state.visible === true &&
            <div className="well well-lg" key={comments[this.state.key].id}>
              <h3>Update Comment</h3>
              <form onSubmit={this.handleUpdate}>
                <div className="form-group">
                  <label>Author</label>
                  <input name="id" ref="id" value={comments[this.state.key].id} type="hidden" className="form-control" />
                  <input name="author" ref="author" defaultValue={comments[this.state.key].author} type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Body</label>
                  <textarea name="body" ref="body" defaultValue={comments[this.state.key].body} className="form-control" />
                </div>
                <button type="submit" className="btn btn-default comment">Comment</button>
              </form>
            </div>
          }
        </div>
        {this.state.visible === false &&
          <div className="well well-lg">
            <h3>New Comment</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Author</label>
                <input name="author" ref="author" type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Body</label>
                <textarea name="body" ref="body" className="form-control" />
              </div>
              <button type="submit" className="btn btn-default comment">Comment</button>
            </form>
          </div>
        }
      </React.Fragment>
    )
  }
}

function mapStateToProps({ commentsReducer }) {
  return {
    comments: commentsReducer.items,
    loading: commentsReducer.loading,
    error: commentsReducer.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteComment: (commentId, vote) => dispatch(voteComment(commentId, vote)),
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    deleteComment: (postId) => dispatch(deleteComment(postId)),
    postComment: (data, postId, callback) => dispatch(postComment(data, postId, callback)),
    updateComment: (formData, commentId, parentId, callback) => dispatch(updateComment(formData, commentId, parentId, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);