// authConfig.ts
import { UserManagerSettings } from 'oidc-client-ts';

const oidcConfig: UserManagerSettings = {
   authority: 'http://localhost:9998/',
   client_id: '46f2b608',
   redirect_uri: 'http://localhost:4000/auth/callback',
   response_type: 'code',
   scope: 'openid profile email',
   post_logout_redirect_uri: 'http://localhost:4000',
   automaticSilentRenew: true,
   silent_redirect_uri: 'http://localhost:4000/silent-renew',
   loadUserInfo: true,
};

export default oidcConfig;
