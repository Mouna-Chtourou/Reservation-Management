import * as yup from 'yup'

export const isEmpty = value => {
  if (!value) return true
  return false
}

export const isEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const isLength = password => {
  if (password.length < 6) return true
  return false
}

export const isTelephone = telephone => {
  //if(telephone. < 8) return true
  // return false
  const t = /^\d{8}$/g
  return t.test(telephone)
}
export const isFax = fax => {
  const t = /^\d{8}$/g
  return t.test(fax)
}

export const isMatch = (password, passwordVerify) => {
  if (password === passwordVerify) return true
  return false
}
