export function handleErrors(response) {
  // console.log('handleErrors response', response)
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  // return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  // 894t uq4u t84u t8v4 t8wu n89g
  return s4() + s4() + s4() + s4() + s4() + s4()
}
