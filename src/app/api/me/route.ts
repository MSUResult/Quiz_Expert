import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Users from "@/models/Users";

export async function GET() {
  await dbConnect();

  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Not logged in" }), {
      status: 401,
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 403,
    });
  }

  // Get user data (no password)
  const user = await Users.findById(decoded.id).select(
    "firstName lastName profileImage email"
  );

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ user }), { status: 200 });
}
