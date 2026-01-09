import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "695d7088aea0d3914ed68f82", 
  requiresAuth: true // Ensure authentication is required for all operations
});
