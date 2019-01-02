import React from 'react'
import { connect } from 'react-redux'
import { fetchComments, updateComment, fetchPostById } from '../actions'
import Loading from './includes/Loading'

class UpdateComment extends React.Component {

    componentDidMount() {
        this.props.fetchComments(this.props.postId)
        this.props.fetchPostById(this.props.postId)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {}
        for (const field in this.refs) {
            formData[field] = this.refs[field].value
        }

        // save
        this.props.updateComment(formData, this.props.postId, this.onPostSuccess)
    }

    onPostSuccess = (response) => {
        console.log('onPostSuccess')
    }

    render() {
        const { comments, error, loading } = this.props

        if (error) { return <div>Error! {error.message}</div>; }

        if (loading) { return <Loading /> }

        console.log(this.props.postId)

        return (
            <React.Fragment>
                <div className="well well-lg">
                    <h3>Update Comment</h3>
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
        fetchComments: (postId) => dispatch(fetchComments(postId)),
        fetchPostById: (postId) => dispatch(fetchPostById(postId)),
        updateComment: (data, postId, callback) => dispatch(updateComment(data, postId, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateComment);