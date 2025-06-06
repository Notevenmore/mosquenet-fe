/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const urlParts = req.nextUrl.pathname.split("/");
  const id = urlParts[urlParts.length - 1];
    try {
      if(id) {
        const response = await axios.get(
          `${process.env.API_URL}/content/${id}`,
          { 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
        return new Response(JSON.stringify({
          content: response.data.content
        }), {
          status: response.data.status,
          headers: { "Content-Type": "application/json" }
        });
      } else {
        return new Response(JSON.stringify({
          message: "Akses illegal!"
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
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