import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import Home from '../components/Home'
import NewPost from '../components/NewPost'
import Post from '../components/Post'
import Category from '../components/Category'
import UpdatePost from '../components/UpdatePost'
import UpdateComment from '../components/includes/UpdateComment';

class MainContainer extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/newpost" component={NewPost} />
        <Route exact path="/post/:categoryPath/:postId" component={Post} />
        <Route exact path="/category/:categoryPath" component={Category} />
        <Route exact path="/updatepost" component={UpdatePost} />
        <Route exact path="/updatecomment/:commentId" component={UpdateComment} />
      </React.Fragment>
    )
  }
}


export default withRouter(MainContainer)