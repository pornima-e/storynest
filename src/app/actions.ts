"use server";
import { getServerClient } from "./lib/wix";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginAction() {
    const client = await getServerClient();
    const data = await client.auth.generateOAuthData(
        `${process.env.NEXT_PUBLIC_URL}/login-callback`,
        process.env.NEXT_PUBLIC_URL
    );
    const { authUrl } = await client.auth.getAuthUrl(data);

    // Mutable cookies API (Next.js 14+)
    const cookieStore = cookies();
    (await cookieStore).set({
        name: "oauthRedirectData",
        value: JSON.stringify(data),
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
    });

    revalidatePath("/");

    redirect(authUrl);
}

export async function logoutAction() {
    const client = await getServerClient();
    const { logoutUrl } = await client.auth.logout(process.env.NEXT_PUBLIC_URL!);

    // Mutable cookies API
    const cookieStore = cookies();
    (await cookieStore).delete("session");

    revalidatePath("/");

    redirect(logoutUrl);
}
