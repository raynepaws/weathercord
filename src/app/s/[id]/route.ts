import { Station, stationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { nullish } from "@/lib/typing";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const station = (await db.select().from(stationsTable).where(eq(stationsTable.id, (await params).id))).values().toArray()[0];

  if (!station) return new Response(null, { status: 404 }); 

  return new Response(JSON.stringify({
    description: nullish(station.description),
    everyonePermissions: station.everyonePermissions,
    id: station.id,
    inviteLink: nullish(station.inviteLink),
    memberCount: station.memberCount,
    name: station.name,
    owner: station.owner
  } satisfies Station), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
