import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export interface Account {
  accent1: string | null;
  accent2: string | null;
  admin: boolean;
  bio: string | null;
  connections: Connection[];
  displayName: string | null;
  email?: string;
  nameFont: string | null;
  id: string;
  joined: number;
  password: string;
  pronouns: string | null;
  username: string;
}

export enum ConnectionType {
  Domain = "domain"
}

export interface Connection {
  id: string;
  type: ConnectionType;
  value: string;
}

export type PublicAccount = Pick<Required<Account>, "accent1" | "accent2" | "admin" | "bio" | "connections" | "displayName" | "id" | "joined" | "nameFont" | "pronouns" | "username">;
export type AuthorizedAccountFromAPI = Required<Omit<Account, "password">>;

export const accountsTable = sqliteTable("accounts", {
  accent1: text(),
  accent2: text(),
  admin: int({ mode: "boolean" }),
  bio: text(),
  displayName: text(),
  email: text(),
  nameFont: text(),
  id: text().notNull().unique(),
  joined: int().notNull(),
  password: text().notNull(),
  pronouns: text(),
  username: text().notNull().unique()
});

export const sessionsTable = sqliteTable("sessions", {
  code: text().notNull(),
  date: int().notNull(),
  id: text().notNull(),
  ip: text(),
  userAgent: text()
});

export const connectionsTable = sqliteTable("connections", {
  id: text().notNull(),
  type: text().notNull(),
  value: text().notNull()
});
