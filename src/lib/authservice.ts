import oidcConfig from '@/config/authconfig';
import { UserManager } from 'oidc-client-ts';

const userManager = new UserManager(oidcConfig);

export default userManager;
