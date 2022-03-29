import { handleAuth, handleLogin, handleCallback, handleLogout } from '@auth0/nextjs-auth0'

const buildErrorQueryString = (code, desc) => {
  let queryString = ''
  let separator = '?'

  if (code) {
    queryString = separator + 'code=' + code
  }

  if (queryString != '') {
    separator = '&'
  }

  if (desc) {
    queryString = queryString + separator + 'desc=' + desc
  }

  return queryString
}

const callback = async (req, res) => {
  try {
    console.log('Executing callback')

    const afterCallback = (req, res, session, state) => {
      console.log(state)
      return session
    }

    await handleCallback(req, res, { afterCallback })
  } catch (ex) {
    console.error('Callback execution failed', { ...ex })

    const { error, error_description } = req.query
    const queryString = buildErrorQueryString(error, error_description)

    return res.redirect('/error' + queryString)
  }
}

const login = async (req, res) => {
  try {
    console.log('Executing login')

    await handleLogin(req, res)
  } catch (ex) {
    console.error('Login execution failed', { ...ex })

    const { error, error_description } = req.query
    const queryString = buildErrorQueryString(error, error_description)

    return res.redirect('/error' + queryString)
  }
}

const logout = async (req, res) => {
  try {
    console.log('Executing logout')

    await handleLogout(req, res)
  } catch (ex) {
    console.error('Logout execution failed', { ...ex })

    const { error, error_description } = req.query
    const queryString = buildErrorQueryString(error, error_description)

    return res.redirect('/error' + queryString)
  }
}

export default handleAuth({ callback, login, logout })