import oidcConfig from '@/config/authConfig';
import { UserManager } from 'oidc-client-ts';

const userManager = new UserManager(oidcConfig);

export default userManager;
