import { combineReducers } from 'redux'

import {
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,

  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  SORT_POSTS,
  FETCH_SINGLE_POST_BEGIN,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAILURE,
  NEW_POST_BEGIN,
  NEW_POST_SUCCESS,
  NEW_POST_FAILURE,

  FETCH_COMMENTS_BEGIN,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  POST_COMMENT_BEGIN,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE
} from '../actions'

const initialState = {
  items: [],
  loading: false,
  error: null
};

function categoriesReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_CATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.categories
      };

    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}

function postsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_POSTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.posts
      };

    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    case NEW_POST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
    }

    case NEW_POST_SUCCESS:
      return {
        ...state,
        loading:false,
        items: [...state.items, action.payload.data]
    }

    case NEW_POST_FAILURE:
      return {
        ...state,
        loading:false,
        error: action.payload.error,
        items: []
    }

    case SORT_POSTS:
      return {
        ...state,
        sortByCriteria: action.payload.sortByCriteria
      };

    default:
      return state;
  }
}

const singlePostInitialState = {
  item: {},
  loading: false,
  error: null
};

function singlePostReducer(state = singlePostInitialState, action) {
  switch(action.type) {
    case FETCH_SINGLE_POST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload.post
      };

    case FETCH_SINGLE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        item: []
      };

    default:
      return state;
  }
}

function commentsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_COMMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.comments
      };

    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    case POST_COMMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
    }

    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        loading:false,
        items: [...state.items, action.payload.data]
    }

    case POST_COMMENT_FAILURE:
      return {
        ...state,
        loading:false,
        error: action.payload.error,
        items: []
    }

    default:
      return state;
  }
}


export default combineReducers({
  categoriesReducer,
  postsReducer,
  singlePostReducer,
  commentsReducer
});