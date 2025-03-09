/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
    try {
      if(id) {
        const response = await axios.get(
          `${process.env.API_URL}/payment/kas/check/${id}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        return new Response(JSON.stringify({
          message: response.data.message
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