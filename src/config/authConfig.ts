// authConfig.ts
import { UserManagerSettings } from 'oidc-client-ts';

const oidcConfig: UserManagerSettings = {
   authority: 'http://localhost:9998/',
   client_id: 'your-client-id',
   redirect_uri: 'http://localhost:3000',
   response_type: 'code',
   scope: 'openid profile email',
   post_logout_redirect_uri: 'http://localhost:3000',
   automaticSilentRenew: true,
   loadUserInfo: true,
};

export default oidcConfig;
