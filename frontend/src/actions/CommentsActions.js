import axios from 'axios'

import { API_ENDPOINT, HEADERS, AUTH_TOKEN } from '../utils/config'
import { handleErrors, guid } from '../utils/helpers'

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

// Comments list
export const FETCH_COMMENTS_BEGIN = 'FETCH_COMMENTS_BEGIN'
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE'

// Post comment
export const POST_COMMENT_BEGIN = 'POST_COMMENT_BEGIN'
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS'
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE'

// Delete Comment
export const DELETE_COMMENT = 'DELETE_COMMENT'

// Update Comment
export const UPDATE_COMMENT = 'DELETE_COMMENT'

export const fetchCommentsBegin = () => ({
  type: FETCH_COMMENTS_BEGIN
});

export const fetchCommentsSuccess = comments => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: { comments }
});

export const fetchCommentsFailure = error => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: { error }
});

export function fetchComments(postId) {
  return dispatch => {
    dispatch(fetchCommentsBegin());
    return fetch(`${API_ENDPOINT}/posts/${postId}/comments`, { headers: HEADERS })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCommentsSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchCommentsFailure(error)))
  };
}

export const postCommentBegin = () => ({
  type: POST_COMMENT_BEGIN
});

export const postCommentSuccess = data => ({
  type: POST_COMMENT_SUCCESS,
  payload: { data }
});

export const postCommentFailure = error => ({
  type: POST_COMMENT_FAILURE,
  payload: { error }
});

export function postComment(formData, parentId, callback) {
  const { body, author } = formData

  const data = {
    id: guid(),
    parentId,
    timestamp: Date.now(),
    body,
    author
  }

  return dispatch => {
    dispatch(postCommentBegin())
    axios.post(`${API_ENDPOINT}/comments`, data)
      .then(res => {
        callback(res.data)
        dispatch(postCommentSuccess(res.data))
      })
      .catch(error => dispatch(postCommentFailure(error)))
  }
}


export const deleteCommentSuccess = id => {
  return {
    type: DELETE_COMMENT,
    payload: {
      id
    }
  }
}

export function deleteComment(id) {
  return (dispatch) => {
    return axios.delete(`${API_ENDPOINT}/comments/${id}`)
      .then(response => {
        dispatch(deleteCommentSuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

// Update Post

export const updateCommentSuccess = (comments) => {
  return {
    type: UPDATE_COMMENT,
    payload: {
      comments
    }
  }
}

export function updateComment(formData, commentId, parentId, callback) {

  const { body, author } = formData

  const data = {
    id: commentId,
    parentId: parentId,
    body,
    author
  }

  return (dispatch) => {
    return axios.put(`${API_ENDPOINT}/comments/${data.id}`, data)
      .then(res => {
        dispatch(updateCommentSuccess(res.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};