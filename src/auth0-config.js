export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || "your-domain.auth0.com",
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || "your-client-id",
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
  cacheLocation: 'localstorage', // Persist auth state across page reloads
  useRefreshTokens: true, // Enable refresh tokens for better session management
};
