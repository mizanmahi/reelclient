// // authConfig.ts
// import { UserManagerSettings } from 'oidc-client-ts';

// const oidcConfig: UserManagerSettings = {
//    authority: 'http://localhost:9998/',
//    client_id: '46f2b608',
//    redirect_uri: 'http://localhost:4000/auth/callback',
//    response_type: 'code',
//    scope: 'openid profile email',
//    post_logout_redirect_uri: 'http://localhost:4000',
//    automaticSilentRenew: true,
//    silent_redirect_uri: 'http://localhost:4000/silent-renew',
//    loadUserInfo: true,
// };

// export default oidcConfig;

// src/auth/config.ts
import { UserManager, UserManagerSettings, User } from 'oidc-client-ts';

const oidcConfig: UserManagerSettings = {
   authority: 'http://localhost:9998/',
   client_id: '46f2b608',
   redirect_uri: 'http://localhost:4000/callback',
   post_logout_redirect_uri: 'http://localhost:4000',
   response_type: 'code', // Use Authorization Code Flow with PKCE
   scope: 'openid profile email',
   silent_redirect_uri: 'http://localhost:4000/silent-renew',
   automaticSilentRenew: true,
   loadUserInfo: true,
};

export const userManager = new UserManager(oidcConfig);

// Helper function to get user info
export const getUser = async (): Promise<User | null> => {
   try {
      return await userManager.getUser();
   } catch (error) {
      console.error('Error getting user:', error);
      return null;
   }
};
