import { accountsTable, Connection, connectionsTable, PublicAccount, sessionsTable } from "@/db/schema";
import cryptoRandomString from "crypto-random-string";
import { cookies } from "next/headers";
import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { hash } from "bcrypt";
import { nullish } from "$/typing";
import { rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const generateUID = (sequential: number) => `${Math.floor(sequential).toString(16)}w${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16).padStart(14, "0")}`;

const dataURIToBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(",")[1]);
  const type = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type });
}

export async function GET(_: Request, { params }: { params: Promise<{ username: string }> }) {
  const account = (await db.select().from(accountsTable).where(eq(accountsTable.username, (await params).username))).values().toArray()[0];

  if (!account) return new Response(null, { status: 404 });

  const connections = (await db.select().from(connectionsTable).where(eq(connectionsTable.id, account.id))).values().toArray() as Connection[];

  return new Response(JSON.stringify({
    accent1: nullish(account.accent1),
    accent2: nullish(account.accent2),
    avatar: `/u/${account.username}/a`,
    admin: !!account.admin,
    banner: `/u/${account.username}/b`,
    bio: nullish(account.bio),
    connections,
    displayName: nullish(account.displayName),
    id: account.id,
    joined: account.joined,
    lang: account.showLang ? account.lang : undefined,
    showLang: account.showLang,
    nameFont: nullish(account.nameFont),
    pronouns: nullish(account.pronouns),
    username: account.username
  } satisfies PublicAccount), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

interface POSTBody {
  email: string;
  password: string;
};

export async function POST(req: Request, { params }: { params: Promise<{ username: string }> }) {
  const username = (await params).username;

  const { email, password }: Partial<POSTBody> = await req.json();

  // if (!email) return new Response("Email is required", { status: 400 });
  if (typeof password === "undefined") return new Response("Password is required", { status: 400 });
  if (typeof username === "undefined") return new Response("Username is required", { status: 400 });

  if (username.length < 1) return new Response("Username is too short", { status: 400 });
  if (username.length > 20) return new Response("Username is too long", { status: 400 });

  // if (email.length > 40) return new NextResponse("Email is too long", { status: 400 });

  if (password.length < 8) return new Response("Password is too short", { status: 400 });
  if (password.length > 50) return new Response("Password is too long", { status: 400 });

  const usernameTaken = (await db.select().from(accountsTable).where(eq(accountsTable.username, username)))[0];
  if (usernameTaken) return new Response("Username is taken", { status: 400 });

  const id = generateUID((await db.select({ count: count() }).from(accountsTable))[0].count);

  const authCode = cryptoRandomString({ length: 100 });
  (await cookies()).set("auth", authCode);
  await db.insert(sessionsTable).values({
    code: authCode,
    date: Date.now(),
    id,
    userAgent: req.headers.get("User-Agent")
  }).execute();

  const passwordHash = await hash(password, 10);
  await db.insert(accountsTable).values({
    email: "",
    id,
    joined: Date.now(),
    password: passwordHash,
    username
  }).execute();

  return new Response();
};

interface PUTBody {
  accent1: string | null,
  accent2: string | null,
  avatar: string | null,
  banner: string | null,
  bio: string;
  displayName: string;
  showLang: boolean;
  nameFont: string;
  pronouns: string;
  username: string;
}

export async function PUT(req: Request, { params }: { params: Promise<{ username: string }> }) {
  const authCookie = (await cookies()).get("auth")?.value;

  if (!authCookie) return new Response("Missing required cookie \"auth\"", { status: 401 });

  const sessionList = (await db.select().from(sessionsTable).where(eq(sessionsTable.code, authCookie))).values().toArray();
  if (!sessionList[0]) return new Response("Authorization token showed no results", { status: 401 });
  const session = sessionList[0];
  const requester = (await db.select().from(accountsTable).where(eq(accountsTable.id, session.id))).values().toArray()[0];
  if (!requester) return new Response("this is weird", { status: 404 });
  const oldUsername = (await params).username;
  const accountToChange = (await db.select().from(accountsTable).where(eq(accountsTable.username, oldUsername))).values().toArray()[0];

  if (requester.id !== accountToChange.id && !requester.admin) return new Response("You cannot edit this account", { status: 403 });

  const { accent1, accent2, avatar, banner, bio, displayName, showLang, nameFont, pronouns, username }: Partial<PUTBody> = await req.json();

  if (typeof bio !== "string") return new Response("Missing bio field", { status: 400 });
  if (typeof displayName !== "string" && typeof displayName === "undefined") return new Response("Missing displayName field", { status: 400 });
  if (typeof showLang !== "boolean") return new Response("Missing showLang field", { status: 400 });
  if (typeof nameFont !== "string" && typeof nameFont === "undefined") return new Response("Missing nameFont field", { status: 400 });
  if (typeof pronouns !== "string") return new Response("Missing pronouns field", { status: 400 });
  if (typeof username !== "string") return new Response("Missing username field", { status: 400 });

  if (accent1 && !accent1.match(/^#[a-fA-F0-9]{6}$/)) return new Response("accent1 is not a valid hex code", { status: 400 });
  if (accent2 && !accent2.match(/^#[a-fA-F0-9]{6}$/)) return new Response("accent2 is not a valid hex code", { status: 400 });
  if (bio.length > 500) return new Response("Bio is too long", { status: 400 });
  if (displayName.length > 40) return new Response("Display name is too long", { status: 400 });
  if (nameFont.length > 20) return new Response("Name font is too long", { status: 400 });
  if (pronouns.length > 20) return new Response("Pronouns are too long", { status: 400 });
  if (username.length < 1) return new Response("Username is too short", { status: 400 });
  if (username.length > 20) return new Response("Username is too long", { status: 400 });
  if (username.match(/[^a-zA-Z0-9-_.]/)) return new Response("Username contains invalid characters", { status: 400 });
  if (username.endsWith(".")) return new Response("Username cannot end with a period", { status: 400 });
  if (username.endsWith("-")) return new Response("Username cannot end with a dash", { status: 400 });

  const usernameTaken = (await db.select().from(accountsTable).where(eq(accountsTable.username, username))).values().toArray()[0];
  if (usernameTaken && accountToChange.username !== username) return new Response("Username is taken", { status: 400 });

  await db.update(accountsTable).set({
    accent1,
    accent2,
    bio,
    displayName,
    showLang,
    nameFont,
    pronouns,
    username
  }).where(eq(accountsTable.id, accountToChange.id)).execute();

  if (avatar) {
    const blob = dataURIToBlob(avatar);

    if (blob.size > 1000000) return new Response("Avatar file is too large to upload", { status: 400 });

    const tempPath = `./database/temp/${requester.id}-avatar.${avatar.split(";")[0].split("/")[1]}`;

    await writeFile(tempPath, await blob.bytes(), {
      encoding: "binary"
    });

    await new Promise((resolve) => {
      const child = spawn("ffmpeg", [
        "-i", tempPath,
        "-c:v", "libaom-av1",     // encoder (libaom-av1 for AVIF)
        "-crf", "25",             // quality
        "-vf", "scale=250:250",   // scaling
        "-y",                     // allow overwrite
        `./database/avatars/${requester.id}.avif`
      ]);
      child.on("close", (code) => {
        resolve(code);
      });
    });

    await rm(tempPath);
  }

  if (banner) {
    const blob = dataURIToBlob(banner);

    if (blob.size > 1000000) return new Response("Banner file is too large to upload", { status: 400 });

    const tempPath = `./database/temp/${requester.id}-banner.${banner.split(";")[0].split("/")[1]}`;

    await writeFile(tempPath, await blob.bytes(), {
      encoding: "binary"
    });

    await new Promise((resolve) => {
      const child = spawn("ffmpeg", [
        "-i", tempPath,
        "-c:v", "libaom-av1",     // encoder (libaom-av1 for AVIF)
        "-crf", "25",             // quality
        "-vf", "scale=450:150",   // scaling
        "-y",                     // allow overwrite
        `./database/banners/${requester.id}.avif`
      ]);
      child.on("close", (code) => {
        resolve(code);
      });
    });

    await rm(tempPath);
  }

  return new Response();
};
