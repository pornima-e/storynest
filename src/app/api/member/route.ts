import { NextResponse } from "next/server";
import { getMember } from "@/app/lib/wix"; // your existing server-only wix.ts

export async function GET() {
    try {
        const member = await getMember();
        if (!member) {
            return NextResponse.json({ member: null }, { status: 401 });
        }
        return NextResponse.json({ member });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch member" }, { status: 500 });
    }
}
