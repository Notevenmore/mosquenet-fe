/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    try {

        cookieStore.delete('admin-status');
        cookieStore.delete('admin-email');
        cookieStore.delete('admin-role');
        cookieStore.delete('master-status');
        cookieStore.delete('user-id');
    
        return new Response(JSON.stringify({
            message: "Anda berhasil logout dari aplikasi"
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Fetch error:", error);
        return new Response(JSON.stringify({ error: error.response.data.message || error.message, }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}