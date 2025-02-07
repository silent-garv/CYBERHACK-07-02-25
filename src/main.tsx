import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';

const domain = "dev-4bvocl4ni1zr3kaa.us.auth0.com";  // Replace with your Auth0 Domain
const clientId = "hGu6KsGxBvQZ4qrqdYg8E0EesUBbE6Da";  // Replace with your Auth0 Client ID

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
