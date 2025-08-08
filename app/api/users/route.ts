import { NextResponse } from "next/server";
import { addUser, getUsers } from "@/lib/data/users";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredUsers = getUsers().filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query),
  );

  return NextResponse.json(filteredUsers);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newUser = addUser({
      name: body.name,
      email: body.email,
      role: body.role,
      status: body.status,
      department: body.department,
      phone: body.phone,
      bio: body.bio,
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}
