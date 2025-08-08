import { NextResponse } from "next/server";
import { deleteUser, getUserById, updateUser } from "@/lib/data/users";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
	const user = getUserById(parseInt(id));

	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}

	return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
	try {
		const body = await request.json();
		const userId = parseInt(id);

		const updated = updateUser(userId, body);
		if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 });
		return NextResponse.json(updated);
	} catch (error) {
		return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
	}
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
	const userId = parseInt(id);
	const ok = deleteUser(userId);
	if (!ok) return NextResponse.json({ error: "User not found" }, { status: 404 });
	return NextResponse.json({ message: "User deleted successfully" });
}
