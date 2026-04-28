import { accountsTable, sessionsTable } from "@/db/schema";
import cryptoRandomString from "crypto-random-string";
import { db } from "@/db";
import { count, eq } from "drizzle-orm";
import { hash } from "bcrypt";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface POSTBody {
  email: string;
  password: string;
};

const generateUID = (sequential: number) => `${Math.floor(sequential).toString(16)}w${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16).padStart(14, "0")}`;

export const POST = async (req: Request) => {
  const router = useRouter();
  const username = router.query.username as string;

  const { email, password }: Partial<POSTBody> = await req.json();

  // if (!email) return new NextResponse("Email is required", { status: 400 });
  if (!password) return new NextResponse("Password is required", { status: 400 });

  if (username.length < 1) return new NextResponse("Username is too short", { status: 400 });
  if (username.length > 20) return new NextResponse("Username is too long", { status: 400 });

  // if (email.length > 40) return new NextResponse("Email is too long", { status: 400 });

  if (password.length < 8) return new NextResponse("Password is too short", { status: 400 });
  if (password.length > 50) return new NextResponse("Password is too long", { status: 400 });

  const usernameTaken = !!db.select().from(accountsTable).where(eq(accountsTable.username, username));
  if (usernameTaken) return new NextResponse("Username is taken", { status: 400 });

  const id = generateUID((await db.select({ count: count() }).from(accountsTable))[0].count);

  const authCode = cryptoRandomString({ length: 100 });
  (await cookies()).set("auth", authCode);
  db.insert(sessionsTable).values({
    code: authCode,
    date: Date.now(),
    id,
    userAgent: req.headers.get("User-Agent")
  });

  const passwordHash = await hash(password, 10);
  db.insert(accountsTable).values({
    email: "",
    id,
    joined: Date.now(),
    password: passwordHash,
    username
  });

  return new NextResponse();
}
