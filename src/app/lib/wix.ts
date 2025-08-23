import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { cookies } from "next/headers";

export async function getServerClient() {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get("session")?.value ?? null;
    const tokens = sessionCookie ? JSON.parse(sessionCookie) : null;

    return createClient({
        modules: { items },
        auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
            tokens,
        }),
    });
}