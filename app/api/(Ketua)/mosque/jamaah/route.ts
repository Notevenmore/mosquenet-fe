/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
    try {
        const userId = req.cookies.get('user-id');
        if(userId) {
          const data = await axios.get(`${process.env.API_URL}/mosque/jamaah/${encodeURIComponent(userId.value)}`, {
            headers: {
                'Content-Type': 'application/json'
            }
          });

          return new Response(JSON.stringify({
               jamaah: data!.data.jamaah
          }), {
              status: 200,
              headers: {
                  "Content-Type": "application/json"
              }
          });
        } else {
          return new Response(JSON.stringify({
            message: "Akses Illegal",
          }), {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          });
        }
    } catch (error: any) {
        console.error("Fetch error:", error);
        return new Response(JSON.stringify({ error: error.response.data.message || error.message, }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}