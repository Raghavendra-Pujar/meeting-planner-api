'use srict'

let trim = (x) => {
  let value = String(x)
  return value.replace(/^\s+|\s+$/gm, '')
}
let isEmpty = (value) => {
  if (value === null || value === "undefined" || trim(value) === '' || typeof value === "undefined" ||value.length === 0) {
    return true
  } else {
    return false
  }
}

let checkuserType = (userName) =>{
  let regex =  /-admin$/
  return regex.test(userName);
}
/**
 * exporting functions.
 */
module.exports = {
  isEmpty: isEmpty,
  checkuserType : checkuserType
}
