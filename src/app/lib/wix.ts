import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
const client = createClient({
    modules: { items },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
})

export default client;