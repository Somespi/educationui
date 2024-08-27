import { hydrateAuth, isSignedIn } from 'svelte-google-auth/server';
import { redirect } from '@sveltejs/kit';

export const load: any = ({ locals }) => {
    if (!isSignedIn(locals)) {
        throw redirect(302, '/auth/login');
    }
    // By calling hydrateAuth, certain variables from locals are parsed to the client
    // allowing the client to access the user information and the client_id for login
    return { ...hydrateAuth(locals) };
};

