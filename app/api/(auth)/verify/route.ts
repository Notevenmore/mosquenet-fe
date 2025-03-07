"use server"

import axios from "axios";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    try {
        const request = await req.json();
        const response = await axios.post(
            `${process.env.API_URL}/auth/verify`, 
            { token: request.token }
        );
    
        return new Response(JSON.stringify({
            message: response.data.message
        }), {
            status: response.data.status,
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