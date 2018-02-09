import auth0 from 'auth0-js'
import EventEmitter from 'EventEmitter'
import router from './../router'

export default class Auth {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: '{AUTH0_DOMAIN}',
    clientID: '{AUTH0_CLIENT_ID}',
    redirectUri: '{AUTH0_CALLBACK_URL}',
    audience: '{AUTH0_AUDIENCE}',
    responseType: 'token id_token',
    scope: 'openid'
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('/')
      } else if (err) {
        router.replace('/')
      }
    })
  }

  setSession (authResult, profile) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )

    localStorage.setItem('graphql_auth0_access_token', authResult.accessToken)
    localStorage.setItem('graphql_auth0_id_token', authResult.idToken)
    localStorage.setItem('graphql_auth0_expires_at', expiresAt)

    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('graphql_auth0_access_token')
    localStorage.removeItem('graphql_auth0_id_token')
    localStorage.removeItem('graphql_auth0_expires_at')

    this.authNotifier.emit('authChange', false)

    // navigate to the home route
    router.replace('/')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(
      localStorage.getItem('graphql_auth0_expires_at')
    )
    return new Date().getTime() < expiresAt
  }
}
