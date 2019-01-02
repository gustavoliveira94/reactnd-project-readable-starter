import React from 'react'
import { connect } from 'react-redux'
import Categories from './includes/Categories'
import Header from '../components/includes/Header'
import Nav from '../components/includes/Nav'
import { fetchPostById, updatePost } from '../actions'
import Loading from './includes/Loading'

class UpdatePost extends React.Component {

    changePost = (e) => {
        e.preventDefault()

        const formData = {}
        for (const field in this.refs) {
            formData[field] = this.refs[field].value
        }

        // save
        this.props.updatePost(formData, this.onPutSuccess)
    }

    onPutSuccess = (response) => {
        this.props.history.push(`/post/${response.category}/${response.id}`);
    }

    componentDidMount() {
        const { match } = this.props
        this.props.fetchPostById(match.params.postId)
    }


    render() {
        const { categories, error, loading, post } = this.props

        if (error) { return <div>Error! {error.message}</div>; }

        if (loading) { return <Loading /> }

        return (
            <React.Fragment>
                <Nav />
                <div className='container'>
                    <Header />
                    <div className="row">
                        <div className="col-sm-8 blog-main">
                            <h2>Update Post</h2>
                            <form onSubmit={this.changePost}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input name="id" ref="id" value={post.id} type="hidden" className="form-control" />
                                    <input name="title" ref="title" value={post.title} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Body</label>
                                    <textarea name="body" ref="body" value={post.body} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Author</label>
                                    <input name="author" ref="author" value={post.author} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select name="category" ref="category" className="form-control">
                                        {categories.map(category =>
                                            <option key={category.path} value={category.path}>{category.name}</option>
                                        )}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-default comment">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps({ categoriesReducer, singlePostReducer }) {
    return {
        post: singlePostReducer.item,
        categories: categoriesReducer.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPostById: (postId) => dispatch(fetchPostById(postId)),
        updatePost: (formData, callback) => dispatch(updatePost(formData, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePost);