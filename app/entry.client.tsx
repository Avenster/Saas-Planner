/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';


startTransition(() => {

  hydrateRoot(
    
    document,
    <Auth0Provider
      domain="dev-0r2jarvap80eyjrq.us.auth0.com"
    clientId="RVfINt0HltSXu3NX6AXOIoEkGIdje2au"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >

    <StrictMode>

      <RemixBrowser />
    </StrictMode>
    </Auth0Provider>
  );
});

