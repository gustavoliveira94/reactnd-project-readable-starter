import axios from 'axios'

import { API_ENDPOINT, HEADERS, AUTH_TOKEN } from '../utils/config'
import { handleErrors, guid } from '../utils/helpers'

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

// List of posts
export const FETCH_POSTS_BEGIN = 'FETCH_POSTS_BEGIN'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

// Sort posts
export const SORT_POSTS = 'SORT_POSTS'

// Get post
export const FETCH_SINGLE_POST_BEGIN = 'FETCH_SINGLE_POST_BEGIN'
export const FETCH_SINGLE_POST_SUCCESS = 'FETCH_SINGLE_POST_SUCCESS'
export const FETCH_SINGLE_POST_FAILURE = 'FETCH_SINGLE_POST_FAILURE'

// Create post
export const NEW_POST_BEGIN = 'NEW_POST_BEGIN'
export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS'
export const NEW_POST_FAILURE = 'NEW_POST_FAILURE'

// Delete post
export const DELETE_POST = 'DELETE_POST'

// Update post
export const UPDATE_POST = 'UPDATE_POST'


export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN
})

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
})

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error }
})

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchPostsBegin())
    return fetch(API_ENDPOINT + '/posts', { headers: HEADERS })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchPostsSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchPostsFailure(error)))
  }
}

export const sortPosts = sortByCriteria => ({
  type: SORT_POSTS,
  payload: { sortByCriteria }
})

export const fetchSinglePostBegin = () => ({
  type: FETCH_SINGLE_POST_BEGIN
})

export const fetchSinglePostSuccess = post => ({
  type: FETCH_SINGLE_POST_SUCCESS,
  payload: { post }
})

export const fetchSinglePostFailure = error => ({
  type: FETCH_SINGLE_POST_FAILURE,
  payload: { error }
})

export function fetchPostById(id) {
  return dispatch => {
    dispatch(fetchSinglePostBegin())
    return fetch(`${API_ENDPOINT}/posts/${id}`, { headers: HEADERS })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchSinglePostSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchSinglePostFailure(error)))
  }
}

// New Post
export const newPostBegin = () => ({
  type: NEW_POST_BEGIN
})

export const newPostSuccess = data => ({
  type: NEW_POST_SUCCESS,
  payload: { data }
})

export const newPostFailure = error => ({
  type: NEW_POST_FAILURE,
  payload: { error }
})

export function newPost(formData, callback) {
  const { title, body, author, category } = formData

  const data = {
    id: guid(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category,
    voteScore: 0,
    deleted: false,
    commentCount: 0
  }

  return dispatch => {
    dispatch(newPostBegin())
    axios.post(`${API_ENDPOINT}/posts`, data)
      .then(res => {
        callback(res.data)
        dispatch(newPostSuccess(res.data))
      })
      .catch(error => dispatch(newPostFailure(error)))

  }
}

// Vote
export function votePost(id, vote) {

  const data = {
    option: vote
  }

  return dispatch => {
    dispatch(fetchSinglePostBegin())
    axios.post(`${API_ENDPOINT}/posts/${id}`, data)
      .then(res => {
        dispatch(fetchSinglePostSuccess(res.data))
      })
      .catch(error => dispatch(fetchSinglePostFailure(error)))
  }
}


//Delete

export const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    payload: {
      id,
      deleted: true
    }
  }
}

export function deletePost(id) {
  return (dispatch) => {
    return axios.delete(`${API_ENDPOINT}/posts/${id}`)
      .then(response => {
        dispatch(deletePostSuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

// Update Post

export const updatePostSuccess = (data) => {
  return {
    type: UPDATE_POST,
    payload: {
      data
    }
  }
}

export function updatePost(formData, callback) {

  const { id, title, body, author, category } = formData

  const data = {
    id,
    title,
    body,
    author,
    category
  }

  return (dispatch) => {
    return axios.put(`${API_ENDPOINT}/posts/${data.id}`, data)
    .then(res => {
      callback(res.data)
        dispatch(updatePostSuccess(res.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};