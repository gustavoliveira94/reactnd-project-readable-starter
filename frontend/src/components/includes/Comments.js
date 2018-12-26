import React from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment-timezone'
import { fetchComments, postComment } from '../../actions'
import Loading from './Loading'

class Comments extends React.Component {

  componentDidMount() {
    this.props.fetchComments( this.props.postId )
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

  onPostSuccess = (response) => {
    console.log('onPostSuccess')
  }

  render() {
    const { comments, error, loading } = this.props

    if (error) { return <div>Error! {error.message}</div>; }

    if (loading) { return <Loading />}

    return (
      <React.Fragment>
        <ul className="nav nav-tabs">
          <li className="active">Comments</li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane active">
            { comments && comments.map(item =>
              <div className="well well-lg" key={ `comment-${item.id}` }>
                <h4 className="media-heading text-uppercase reviews">{item.author}</h4>
                <p>{item.body}</p>
                <div className="text-muted">Commented on {moment(item.timestamp).format("MM/DD/YYYY")}</div>
              </div>
            )}
          </div>
        </div>
        <div className="well well-lg">
          <h3>New Comment</h3>
          <form onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <label>Author</label>
              <input name="author" ref="author" type="text" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Body</label>
              <textarea name="body" ref="body" className="form-control"/>
            </div>
            <button type="submit" className="btn btn-default">Comment</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps ({ commentsReducer }) {
  return {
    comments: commentsReducer.items,
    loading: commentsReducer.loading,
    error: commentsReducer.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    postComment: (data, postId, callback) => dispatch(postComment(data, postId, callback))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Comments);