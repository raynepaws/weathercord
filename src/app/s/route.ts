import { accountsTable, membershipsTable, sessionsTable, stationsTable } from "@/db/schema";
import { cookies } from "next/headers";
import { count, eq } from "drizzle-orm";
import { db } from "@/db";

const generateID = (sequential: number) => `${Math.floor(sequential).toString(16)}s${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16).padStart(14, "0")}`;

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const station = (await db.select().from(stationsTable).where(eq(stationsTable.id, (await params).id))).values().toArray()[0];

  if (!station) return new Response(null, { status: 404 });

  return new Response(JSON.stringify(station), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

interface POSTBody {
  name: string;
};

export async function POST(req: Request) {
  const authCookie = (await cookies()).get("auth")?.value;

  if (!authCookie) return new Response("Missing required cookie \"auth\"", { status: 401 });

  const sessionList = (await db.select().from(sessionsTable).where(eq(sessionsTable.code, authCookie))).values().toArray();
  if (!sessionList[0]) return new Response("Authorization token showed no results", { status: 401 });
  const session = sessionList[0];
  const account = (await db.select().from(accountsTable).where(eq(accountsTable.id, session.id))).values().toArray()[0];

  if (!account) return new Response("this is weird", { status: 404 });

  const { name }: Partial<POSTBody> = await req.json();

  if (typeof name !== "string") return new Response("Name is required", { status: 400 });

  if (name.length < 1) return new Response("Name is too short", { status: 400 });
  if (name.length > 50) return new Response("Name is too long", { status: 400 });

  const id = generateID((await db.select({ count: count() }).from(stationsTable))[0].count);

  await db.insert(stationsTable).values({
    everyonePermissions: "0",
    id,
    name,
    owner: account.id
  }).execute();

  await db.insert(membershipsTable).values({
    id: account.id,
    joined: Date.now(),
    station: id
  }).execute();

  return new Response();
};
