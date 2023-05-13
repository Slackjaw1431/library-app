export const oktaConfig = {
    clientId: '0oa95os12ex1iEkyV5d7',
    issuer: 'https://dev-46468192.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce : true,
    disableHttpsCheck: true,
}