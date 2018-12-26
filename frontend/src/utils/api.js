const API_ENDPOINT = 'http://localhost:3001'
const APP_KEY = 'whatever-you-want'

export function fetchCategories () {
  return fetch( API_ENDPOINT + '/categories',{ headers: { 'Authorization': APP_KEY }})
  .then(res => res.json())
}


export function fetchPosts () {
  return fetch( API_ENDPOINT + '/posts',{ headers: { 'Authorization': APP_KEY }})
  .then(res => res.json())
}