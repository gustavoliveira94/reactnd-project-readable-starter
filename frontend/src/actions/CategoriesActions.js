import { API_ENDPOINT, HEADERS } from '../utils/config'
import { handleErrors } from '../utils/helpers'

export const FETCH_CATEGORIES_BEGIN = 'FETCH_CATEGORIES_BEGIN'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'

export const fetchCategoriesBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: { categories }
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error }
});

export function fetchCategories() {
  return dispatch => {
    dispatch(fetchCategoriesBegin());
    return fetch( `${API_ENDPOINT}/categories`, { headers: HEADERS })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCategoriesSuccess(json.categories));
        return json.categories;
      })
      .catch(error => dispatch(fetchCategoriesFailure(error)));
  };
}
