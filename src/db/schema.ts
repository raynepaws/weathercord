import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const boolean = () => int({ mode: "boolean" });

export interface Account {
  accent1: string | null;
  accent2: string | null;
  avatar: string;
  admin: boolean;
  banner: string;
  bio: string | null;
  connections: Connection[];
  displayName: string | null;
  email: string;
  id: string;
  joined: number;
  lang: string;
  showLang: boolean;
  nameFont: string | null;
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

export type PublicAccount = Omit<Required<Account>, "email" | "password" | "lang"> & { lang?: string };
export type AuthorizedAccountFromAPI = Required<Omit<Account, "password">>;

export const accountsTable = sqliteTable("accounts", {
  accent1: text(),
  accent2: text(),
  admin: boolean(),
  bio: text(),
  displayName: text(),
  email: text().notNull(),
  id: text().notNull().unique(),
  joined: int().notNull(),
  lang: text().notNull().default("en-us"),
  showLang: boolean().notNull().default(false),
  nameFont: text(),
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

export const stationsTable = sqliteTable("stations", {
  description: text(),
  everyonePermissions: text().notNull(),
  id: text().notNull().unique(),
  inviteLink: text().unique(),
  // for optimization. keeping track of this number in its own column is much less resource-intensive than having SQLite actually count the number of members
  memberCount: int().notNull().default(1),
  name: text().notNull(),
  owner: text().notNull()
});

export const categoriesTable = sqliteTable("categories", {
  description: text(),
  everyonePermissions: text(),
  id: text().notNull().unique(),
  name: text().notNull(),
  order: int().notNull()
});

export const channelsTable = sqliteTable("channels", {
  category: text().notNull(),
  description: text(),
  everyonePermissions: text(),
  id: text().notNull().unique(),
  name: text().notNull(),
  order: int().notNull(),
  type: int().notNull()
});

export const membershipsTable = sqliteTable("memberships", {
  accent1: text(),
  accent2: text(),
  bio: text(),
  displayName: text(),
  id: text().notNull(),
  joined: int().notNull(),
  nameFont: text(),
  showLang: boolean(),
  station: text().notNull(),
  pronouns: text()
});

export const rolesTable = sqliteTable("roles", {
  color: text(),
  id: text().notNull().unique(),
  name: text().notNull(),
  permissions: text().notNull(),
  station: text().notNull()
});
